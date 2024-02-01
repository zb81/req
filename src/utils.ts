export function isFunction(val: unknown): val is Function {
  return !!val && typeof val === 'function'
}
