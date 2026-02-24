const __PROMISES__: Record<string, Promise<unknown>> = {};

export function takeFirst<T>(key: string, handler: () => Promise<T>): Promise<T> {
  const promise = __PROMISES__[key];
  if (promise) {
    return promise as Promise<T>;
  }
  __PROMISES__[key] = handler();
  return __PROMISES__[key] as Promise<T>;
}
