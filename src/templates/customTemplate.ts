import { BaseTemplate } from './baseTemplates'
import { Position } from 'vscode'
import * as vsc from "vscode"
import * as ts from 'typescript'
import { CompletionItemBuilder } from '../completionItemBuilder'

function log_message(message: string) {
  console.log("postfix-python", message);
}

export class CustomTemplate extends BaseTemplate {
  private conditionsMap = new Map<string, (node: ts.Node) => boolean>([
    ['identifier', (node: ts.Node) => this.isIdentifier(node)],
    ['expression', (node: ts.Node) => this.isExpression(node.parent)],
    ['binary-expression', (node: ts.Node) => this.isBinaryExpression(node.parent)],
    ['unary-expression', (node: ts.Node) => this.isUnaryExpression(node.parent)],
    ['function-call', (node: ts.Node) => this.isCallExpression(node.parent)]
  ])

  constructor(private name: string, private description: string, private body: string, private conditions: string[]) {
    super()
  }

  buildCompletionItem(node: ts.Node, pos: vsc.Position, pending_length: number, indentSize?: number) {
    let currentNode = this.getCurrentNode(node);
    // console.log("postfix-python", "current_node:", currentNode, "name:", this.name, "text:", currentNode.getText());
    // this.channel.appendLine("Current_node:" + currentNode + "name:" + this.name + ", text:" + currentNode.getText() + suffix);

    return CompletionItemBuilder
      .create(this.name, currentNode)
      .description(this.description)
      .replace(this.body, pos, pending_length, true)
      .build()
  }

  canUse(node: ts.Node): boolean {
    return node.parent && (this.conditions.length === 0 || this.conditions.some(c => this.condition(node, c)))
  }

  condition = (node: ts.Node, condition: string) => {
    const callback = this.conditionsMap.get(condition)
    return callback && callback(node)
  }
}
