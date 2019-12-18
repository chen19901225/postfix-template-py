import * as ts from 'typescript'
import * as vsc from 'vscode'
export const getIndentCharacters = () => {
  if (vsc.window.activeTextEditor.options.insertSpaces) {
    return ' '.repeat(vsc.window.activeTextEditor.options.tabSize as number)
  } else {
    return '\t'
  }
}

const operatorMapping = new Map<ts.SyntaxKind, ts.SyntaxKind>([
  [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken],
  [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken],
  [ts.SyntaxKind.GreaterThanEqualsToken, ts.SyntaxKind.LessThanToken],
  [ts.SyntaxKind.GreaterThanToken, ts.SyntaxKind.LessThanEqualsToken]
])

const reverseMapping = new Map<ts.SyntaxKind, ts.SyntaxKind>()
operatorMapping.forEach((v, k) => reverseMapping.set(v, k))

const logicalOperatorMapping = new Map<ts.SyntaxKind, ts.SyntaxKind>([
  [ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken],
  [ts.SyntaxKind.BarBarToken, ts.SyntaxKind.AmpersandAmpersandToken]
])

export const invertBinaryExpression = (expr: ts.BinaryExpression, addOrBrackets: boolean = false): string => {
  let op = operatorMapping.get(expr.operatorToken.kind) || reverseMapping.get(expr.operatorToken.kind)
  if (op) {
    return `${expr.left.getText()} ${ts.tokenToString(op)} ${expr.right.getText()}`
  }

  op = logicalOperatorMapping.get(expr.operatorToken.kind)
  if (op) {
    let left = invertExpression(expr.left, op !== ts.SyntaxKind.BarBarToken)
    let right = invertExpression(expr.right, op !== ts.SyntaxKind.BarBarToken)
    let result = `${left} ${ts.tokenToString(op)} ${right}`

    return addOrBrackets && op === ts.SyntaxKind.BarBarToken ? `(${result})` : result
  }
}

export const invertExpression = (expr: ts.Node, addOrBrackets: boolean = false) => {
  let text = expr.getText()

  if (expr.kind === ts.SyntaxKind.BinaryExpression) {
    let result = invertBinaryExpression(expr as ts.BinaryExpression, addOrBrackets)
    if (result) {
      return result
    }

    return text.startsWith('!') ? text.substr(1) : `!(${text})`
  }

  return text.startsWith('!') ? text.substr(1) : `!${text}`
}



export interface Deferred<T> {
  readonly promise: Promise<T>;
  readonly resolved: boolean;
  readonly rejected: boolean;
  readonly completed: boolean;
  resolve(value?: T | PromiseLike<T>): void;
  // tslint:disable-next-line:no-any
  reject(reason?: any): void;
}

class DeferredImpl<T> implements Deferred<T> {
  private _resolve!: (value?: T | PromiseLike<T>) => void;
  // tslint:disable-next-line:no-any
  private _reject!: (reason?: any) => void;
  private _resolved: boolean = false;
  private _rejected: boolean = false;
  private _promise: Promise<T>;
  // tslint:disable-next-line:no-any
  constructor(private scope: any = null) {
    // tslint:disable-next-line:promise-must-complete
    this._promise = new Promise<T>((res, rej) => {
      this._resolve = res;
      this._reject = rej;
    });
  }
  public resolve(_value?: T | PromiseLike<T>) {
    // tslint:disable-next-line:no-any
    this._resolve.apply(this.scope ? this.scope : this, arguments as any);
    this._resolved = true;
  }
  // tslint:disable-next-line:no-any
  public reject(_reason?: any) {
    // tslint:disable-next-line:no-any
    this._reject.apply(this.scope ? this.scope : this, arguments as any);
    this._rejected = true;
  }
  get promise(): Promise<T> {
    return this._promise;
  }
  get resolved(): boolean {
    return this._resolved;
  }
  get rejected(): boolean {
    return this._rejected;
  }
  get completed(): boolean {
    return this._rejected || this._resolved;
  }
}
// tslint:disable-next-line:no-any
export function createDeferred<T>(scope: any = null): Deferred<T> {
  return new DeferredImpl<T>(scope);
}

export function createDeferredFrom<T>(...promises: Promise<T>[]): Deferred<T> {
  const deferred = createDeferred<T>();
  Promise.all<T>(promises)
    // tslint:disable-next-line:no-any
    .then(deferred.resolve.bind(deferred) as any)
    // tslint:disable-next-line:no-any
    .catch(deferred.reject.bind(deferred) as any);

  return deferred;
}
export function createDeferredFromPromise<T>(promise: Promise<T>): Deferred<T> {
  const deferred = createDeferred<T>();
  promise
    .then(deferred.resolve.bind(deferred))
    .catch(deferred.reject.bind(deferred));
  return deferred;
}
