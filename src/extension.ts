'use strict'
import * as vsc from 'vscode'
import { PostfixCompletionProvider } from './postfixCompletionProvider'


let completionProvider: vsc.Disposable

export function activate (context: vsc.ExtensionContext) {
  console.log("postfix-python"+"extension actived");
  // let channel: vsc.OutputChannel = vsc.window.createOutputChannel("postfix-python");
  // channel.appendLine("extension activated");
  registerCompletionProvider(context);

  // context.subscriptions.push(vsc.commands.registerTextEditorCommand(NOT_COMMAND, async (editor: vsc.TextEditor, _: vsc.TextEditorEdit, ...args: any[]) => {
  //   let [position, suffix, ...expressions] = args

  //   await notCommand(editor, position, suffix, expressions)
  // }))

  context.subscriptions.push(vsc.workspace.onDidChangeConfiguration(() => {
    if (completionProvider) {
      let idx = context.subscriptions.indexOf(completionProvider)
      context.subscriptions.splice(idx, 1)
      completionProvider.dispose()
    }

    registerCompletionProvider(context);
  }))
}

// tslint:disable-next-line:no-empty
export function deactivate () {
}

function registerCompletionProvider (context: vsc.ExtensionContext) {
  const provider = new PostfixCompletionProvider();

  let DOCUMENT_SELECTOR: vsc.DocumentSelector =
    process.env.NODE_ENV === 'test' ? 'postfix' : vsc.workspace.getConfiguration('postfix-py').get('languages')
    console.log("postfix-python"+",document:"+ DOCUMENT_SELECTOR+provider.templates.length);
    // channel.appendLine("document:" +DOCUMENT_SELECTOR + ", provider length:" + provider.templates.length);
  completionProvider = vsc.languages.registerCompletionItemProvider(DOCUMENT_SELECTOR, provider, '.')
  context.subscriptions.push(completionProvider)
}
