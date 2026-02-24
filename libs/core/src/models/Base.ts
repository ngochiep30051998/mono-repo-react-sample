export function Base<T>() {
  abstract class BaseModel {
    constructor(data: Record<string, unknown> = {}) {
      Object.assign(this, data);
    }
    static fromObject(this: new (data: Record<string, unknown>) => T, data: Record<string, unknown> = {}): T {
      const obj = new this(data) as T;
      Object.assign(obj as object, data);
      return obj;
    }
    static fromArray(this: new (data: Record<string, unknown>) => T, data: Record<string, unknown>[] = []): T[] {
      return data.map((it) => (this as unknown as { fromObject: (d: Record<string, unknown>) => T }).fromObject(it));
    }
  }
  return BaseModel;
}
