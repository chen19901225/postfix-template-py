import * as ts from 'typescript'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseTemplate } from './baseTemplates'
import { getIndentCharacters } from '../utils'
import * as vsc from "vscode"

abstract class BaseForTemplate extends BaseTemplate {
  canUse(node: ts.Node): boolean {
    return true;
    // return !this.inReturnStatement(node) &&
    //   !this.inIfStatement(node) &&
    //   !this.inFunctionArgument(node) &&
    //   !this.inVariableDeclaration(node) &&
    //   !this.inAssignmentStatement(node) &&
    //   (this.isIdentifier(node) ||
    //     this.isPropertyAccessExpression(node) ||
    //     this.isElementAccessExpression(node) ||
    //     this.isCallExpression(node) ||
    //     this.isArrayLiteral(node))
  }

  protected isArrayLiteral = (node: ts.Node) => node.kind === ts.SyntaxKind.ArrayLiteralExpression
}


function is_var_dict(text: string) {
  if (["d", "kwargs"].indexOf(text) > -1) {
    return true;
  }
  if (text.endsWith("_d")) {
    return true;
  }
}
function try_get_list_name(text: string): [boolean, string] {
  for (let start of ["iter_", "list_"]) {
    if (text.startsWith("iter_")) {
      return [true, text.slice(start.length)]
    }
  }
  if (text.endsWith("s")) {
    return [true, text.slice(0, text.length - 1)]
  }
  return [false, ""]


}

export class ForTemplate extends BaseForTemplate {
  buildCompletionItem(node: ts.Node, position: vsc.Position, document: vsc.TextDocument, indentSize?: number) {
    // console.log("node:", node);
    let nodeText = node.getText();
    if (is_var_dict(nodeText)) {
      return CompletionItemBuilder
        .create('for', node)
        .description('for (let i = 0; i < expr.Length; i++)')
        .replace(`for (\${1:key},\${2:value}) in \${3:{{expr}}}.items():`, position, document, true)
        // .replace(`for (let \${1:i} = 0; \${1} < \${2:{{expr}}}.length; \${1}++) {\n${getIndentCharacters()}\${0}\n}`, true)
        .build()
    }
    let [flag, name] = try_get_list_name(nodeText);
    if (!flag) {
      return CompletionItemBuilder
        .create('for', node)
        .description('for (let i = 0; i < expr.Length; i++)')
        .replace(`for \${1:ele} in \${2:{{expr}}}:`, position, document, true)
        // .replace(`for (let \${1:i} = 0; \${1} < \${2:{{expr}}}.length; \${1}++) {\n${getIndentCharacters()}\${0}\n}`, true)
        .build()
    } else {
      let replace_text = 'for ${1:' + name + '} in ${2:{{expr}}}:';
      return CompletionItemBuilder
        .create('for', node)
        .description('for (let i = 0; i < expr.Length; i++)')
        .replace(replace_text, position, document, true)
        // .replace(`for (let \${1:i} = 0; \${1} < \${2:{{expr}}}.length; \${1}++) {\n${getIndentCharacters()}\${0}\n}`, true)
        .build()
    }


  }

  canUse(node: ts.Node) {
    let flag = super.canUse(node)
      && !this.isArrayLiteral(node)
      && !this.isCallExpression(node)
    // console.log("postfixtemplate:flag, ", flag);
    return flag
  }
}

// export class ForOfTemplate extends BaseForTemplate {
//   buildCompletionItem(node: ts.Node, indentSize?: number) {
//     return CompletionItemBuilder
//       .create('forof', node, indentSize)
//       .description('for (let item of expr)')
//       .replace(`for (let \${1:item} of \${2:{{expr}}}) {\n${getIndentCharacters()}\${0}\n}`, true)
//       .build()
//   }
// }

// export class ForEachTemplate extends BaseForTemplate {
//   buildCompletionItem(node: ts.Node, indentSize?: number) {
//     return CompletionItemBuilder
//       .create('foreach', node, indentSize)
//       .description('expr.forEach()')
//       .replace(`{{expr}}.forEach(\${1:item} => \${2})`, true)
//       .build()
//   }
// }

export const build = () => [
  new ForTemplate(),
  //   new ForOfTemplate(),
  //   new ForEachTemplate()
]
