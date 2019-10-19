import * as ts from 'typescript'
import * as glob from 'glob'
import * as _ from 'lodash'
import { IPostfixTemplate } from './template'
import { CustomTemplate } from './templates/customTemplate'
import * as vsc from "vscode"
let currentSuggestion = undefined
let reg_word = /^\w*$/ // 有可能reg_word 为空，虽然不知道为什么


export const AllTabs = /^\t+$/
export const AllSpaces = /^ +$/

function string_count(source: string, search:string): number {
  let search_len = search.length;
  let count: number = 0;
  for(let i=0;i<=source.length - search_len;i++) {
    let is_match = 1;
    for(let j=0;j < search_len; j++) {
      if(source[i+j] !== search[j]) {
        is_match = 0;
        break;
      }
    }
    if (is_match === 1) {
      count ++;
    }
  }
  return count;
}

export class PostfixCompletionProvider implements vsc.CompletionItemProvider {
  templates: IPostfixTemplate[] = []
  constructor () {
    this.loadBuiltinTemplates()
    this.loadCustomTemplates()
  }

  provideCompletionItems (document: vsc.TextDocument, position: vsc.Position, token: vsc.CancellationToken): vsc.CompletionItem[] | vsc.CompletionList | Thenable<vsc.CompletionItem[] | vsc.CompletionList> {
    const line = document.lineAt(position.line) // 当前行内容
    let line_text = line.text
    
    
    const dotIdx = line.text.lastIndexOf('.', position.character)  // .的position
    
    if (dotIdx === -1 ) {
      return []
    }
    const pending_text = line_text.substring(dotIdx+1, position.character)  // .以后的内容
    const prefix_text = line_text.substring(0, dotIdx) // .以前的内容
    let pending_result = reg_word.test(pending_text)  //.以后的内容 是否不含有特殊字符
    console.log("postfix-py", "peding_text:", pending_text, "pending_result:", pending_result, "line_text:", line_text, "prefix_text:", prefix_text,
      "quote_count:", string_count(prefix_text, '"') - string_count(prefix_text, '\\"'));
    if ( pending_result=== false){
      return [];
    }


    //ignore in import, from
    if (line_text) {
      line_text =line_text.trimLeft();
      if (line_text.startsWith("from ") || line_text.startsWith("import ") ) {
        return [];
      }
    }

    // 判断是否处于 引号中
    if ((string_count(prefix_text, '"')-string_count(prefix_text, '\\"')) %2 || 
        (string_count(prefix_text, "'") - string_count(prefix_text, "\\'")) %2  
    ) {
      return [];
    }

    const codePiece = line.text.substring(line.firstNonWhitespaceCharacterIndex, dotIdx)  // .以前代码

    let source = ts.createSourceFile('test.ts', codePiece, ts.ScriptTarget.ES5, true) // 这段代码什么意思？ 怎么弄成python的呢？
    const code = line.text.substr(line.firstNonWhitespaceCharacterIndex) // 本行的代码

    const currentNode = findNodeAtPosition(source, dotIdx - line.firstNonWhitespaceCharacterIndex - 1) //获取节点

    if (!currentNode) {
      return []
    }

    if (this.isInsideComment(document, position)) { // 判断处于注释里面
      return []
    }
    const indentSize = this.getIndentSize(document, currentNode)
    let out = []
    for(let template of this.templates) {
      if(template.canUse(currentNode)) {
        let item = template.buildCompletionItem(currentNode,position,pending_text.length + 1, indentSize);
        out.push(item);
      }
    }
    return out
    // return this.templates
    //   .filter(t => t.canUse(currentNode))
    //   .map(t => t.buildCompletionItem(currentNode, indentSize))
  }

  resolveCompletionItem (item: vsc.CompletionItem, token: vsc.CancellationToken): vsc.ProviderResult<vsc.CompletionItem> {
    currentSuggestion = item.label
    return item
  }

  private isInsideComment (document: vsc.TextDocument, position: vsc.Position) { //这个用python来写怎么写？
    const source = ts.createSourceFile('test.ts', document.getText(), ts.ScriptTarget.ES5, true)
    const pos = source.getPositionOfLineAndCharacter(position.line, position.character)
    const nodeKind = findNodeAtPosition(source, pos).kind
    const commentKind = [
      ts.SyntaxKind.JSDocComment,
      ts.SyntaxKind.MultiLineCommentTrivia,
      ts.SyntaxKind.SingleLineCommentTrivia
    ]

    return _.includes(commentKind, nodeKind)
  }

  private loadCustomTemplates = () => {
    const config = vsc.workspace.getConfiguration('postfix-py')
    const templates = config.get('customTemplates') as ICustomTemplateDefinition[]
    if (templates) {
      this.templates.push(...templates.map(t => new CustomTemplate(t.name, t.description, t.body, t.when)))
    }
  }

  private loadBuiltinTemplates = () => {
    // let files = glob.sync('./templates/*.js', { cwd: __dirname })
    // files.forEach(path => {
    //   let builder: () => IPostfixTemplate | IPostfixTemplate[] = require(path).build
    //   if (builder) {
    //     let tpls = builder()
    //     if (Array.isArray(tpls)) {
    //       this.templates.push(...tpls)
    //     } else {
    //       this.templates.push(tpls)
    //     }
    //   }
    // })
    let builder = require("./templates/forTemplate").build
    if(builder) {
      let tpls = builder()
      if(Array.isArray(tpls)) {
        this.templates.push(...tpls)
      } else {
        this.templates.push(tpls)
      }
    }
  }

  private getIndentSize(document: vsc.TextDocument, node: ts.Node): number | undefined {
    const source = node.getSourceFile()
    const position = ts.getLineAndCharacterOfPosition(source, node.getStart(source))

    const line = document.lineAt(position.line)
    const whitespaces = line.text.substring(0, line.firstNonWhitespaceCharacterIndex)

    if (AllTabs.test(whitespaces)) {
      return whitespaces.length
    }

    if (AllSpaces.test(whitespaces)) {
      return whitespaces.length / (vsc.window.activeTextEditor.options.tabSize as number)
    }
  }

}

export const getCurrentSuggestion = () => currentSuggestion
export const resetCurrentSuggestion = () => currentSuggestion = undefined

const findNodeAtPosition = (source: ts.SourceFile, character: number) => { //这个什么意思？
  let matchingNodes: INode[] = []
  source.statements.forEach(visitNode) 
  let sortedNodes = _.orderBy(matchingNodes, [m => m.width, m => m.depth], ['asc', 'desc'])

  return sortedNodes.length > 0 && sortedNodes[0].node

  function visitNode (node: ts.Node, depth: number = 0) { // 这个换成python的是怎么样的？
    const start = node.getStart(source)
    const end = node.getEnd()

    if (start <= character && character < end) {
      matchingNodes.push({
        depth,
        node,
        width: end - start
      })
    }

    node.getChildren(source).forEach(n => visitNode(n, depth + 1))
  }
}

interface INode {
  width: number
  depth: number
  node: ts.Node
}

interface ICustomTemplateDefinition {
  name: string
  description: string
  body: string,
  when: string[]
}


  