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
```
"postfix-py.customTemplates": [{
        "name": "self",
        "body": "self.{{expr}} = {{expr}}",
        "description": "self",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply_self",
        "body": "{{expr}} = self.{{expr}}",
        "description": "apply self",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply",
        "body": "{{expr}} = {{expr}}",
        "description": "apply",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "none",
        "body": "{{expr}}, self.{{expr}} = self.{{expr}}, None",
        "description": "self value none",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "raise",
        "body": "raise {{expr}}",
        "description": "raise ",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "n",
        "body": "{{expr}} is None",
        "description": "is None",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "nn",
        "body": "{{expr}} is not None",
        "description": "is not None",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "str",
        "body": "str({{expr}})",
        "description": "double expr",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "len",
        "body": "len({{expr}})",
        "description": "double expr",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply_none",
        "body": "{{expr}} = None",
        "description": "apply none value",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply_true",
        "body": "{{expr}} = True",
        "description": "apply true value",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply_false",
        "body": "{{expr}} = False",
        "description": "apply false value",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply_dict",
        "body": "{{expr}} = {}",
        "description": "apply dict value",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply_empty",
        "body": "{{expr}} = \"\"",
        "description": "apply empty string",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "apply_list",
        "body": "{{expr}} = []",
        "description": "apply list",
        "when": [
          "identifier", "unary-expression", "binary-expression", "expression", "function-call"
        ]
      },
      {
        "name": "yield",
        "body": "yield {{expr}}",[
              {
                "name": "self",
                "body": "self.{{expr}} = {{expr}}",
                "description": "self",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_self",
                "body": "{{expr}} = self.{{expr}}",
                "description": "apply self",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply",
                "body": "{{expr}} = {{expr}}",
                "description": "apply",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "define_apply",
                "body": "{{expr}}={{expr}}",
                "description": "method apply",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "none",
                "body": "{{expr}}, self.{{expr}} = self.{{expr}}, None",
                "description": "self value none",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "raise",
                "body": "raise {{expr}}",
                "description": "raise ",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "n",
                "body": "{{expr}} is None",
                "description": "is None",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "nn",
                "body": "{{expr}} is not None",
                "description": "is not None",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "str",
                "body": "str({{expr}})",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "len",
                "body": "len({{expr}})",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_none",
                "body": "{{expr}} = None",
                "description": "apply none value",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_true",
                "body": "{{expr}} = True",
                "description": "apply true value",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_false",
                "body": "{{expr}} = False",
                "description": "apply false value",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_dict",
                "body": "{{expr}} = {}",
                "description": "apply dict value",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_empty",
                "body": "{{expr}} = \"\"",
                "description": "apply empty string",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_list",
                "body": "{{expr}} = []",
                "description": "apply list",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "yield",
                "body": "yield {{expr}}",
                "description": "yield value",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "apply_yield",
                "body": "{{expr}} = yield {{expr}}",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "self_apply_none",
                "body": "self.{{expr}} = None",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "self_apply_true",
                "body": "self.{{expr}} = True",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "if",
                "body": "if {{expr}}",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "self_apply_false",
                "body": "self.{{expr}} = False",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "self_apply_emtpy",
                "body": "self.{{expr}} = \"\"",
                "description": "double expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "self_apply_dict",
                "body": "self.{{expr}} = {}",
                "description": "apply dict value",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "self_apply_list",
                "body": "self.{{expr}} = []",
                "description": "apply list value",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "ifn",
                "body": "if {{expr}} is None:",
                "description": "if is None",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "ifnn",
                "body": "if {{expr}} is not None",
                "description": "if is not None",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "not",
                "body": "not {{expr}}",
                "description": "not expr",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "def_apply_true",
                "body": "{{expr}}=True",
                "description": "method apply true",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "def_apply_false",
                "body": "{{expr}}=False",
                "description": "method apply false",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              },
              {
                "name": "def_apply_none",
                "body": "{{expr}}=None",
                "description": "method apply None",
                "when": [
                  "identifier",
                  "unary-expression",
                  "binary-expression",
                  "expression",
                  "function-call"
                ]
              }
            ]
```

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.4
first commit 

### 0.0.5
update customTemplate examples

### 0.0.8
add mycustomTemplates to defaultCustomTemplates

### 0.0.9
try to fix situation like this  `if file = os.path.absfile(file): nn` -> `if file = os.path.absfile(file): is not None

### 0.0.10
still try to fix some bugs`

## 0.0.20
still update template bugs

**Enjoy!**