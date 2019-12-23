# postfix-template-py README

this is a vscode extension postfix template for python

## Features

copyed from  [vscode-postfix-ts](https://github.com/ipatalas/vscode-postfix-ts)

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `postfix-py.customTemplates`:  customTemplates

## myself customTemplates
|template|outcome|
|---|---|
|.self|self.expr = expr|
|.apply_self|expr = self.expr|
|.apply|expr = expr|
|.none|expr, self.expr = self.expr, None|
|.raise| raise expr|
|.n| expr is None|
|.nn|expr is not None|
|.str|str(expr)|
|.len|len(expr)|
|.apply_none| expr = None|
|.apply_true| expr = True|
|.apply_false| expr = False|
|.apply_list| expr = []|
|.apply_empty| expr = ''|
|.yield| yield expr|
|.apply_yield| expr = yield expr |
|.self_apply_none|self.expr = None|
|.self_apply_true|self.expr = True|
|.self_apply_false|self.expr = False|
|.if | if expr|
|.self_apply_empty|self.expr = ''|
|.self_apply_dict|self.expr = {}|
|.self_apply_list|self.expr = []|
|.ifn|if expr is  None:|
|.ifnn|if expr is not None:|
|.not|not expr|
|._def_apply_true| expr=True|
|._def_apply_false| expr=False|
|._def_apply_None| expr=None|
|.if_yield| if  expr is not None:    yield expr|
|.if_return| if  expr is not None:    return expr|
|.ifn_return| if  expr is  None:    return expr|




