export function makeid(length = 10) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function ToArray<T extends Record<string, unknown>>(enumme: T): unknown[] {
  return Object.values(enumme);
}

export function toAttributes(
  attributes: unknown[] | null | undefined,
  keyName: string,
  valueKey: string
): Record<string, unknown> {
  return (
    attributes?.filter(Boolean).reduce((prev: Record<string, unknown>, curr: unknown) => {
      const c = curr as Record<string, unknown>;
      const key = c[keyName] as string;
      const val = (c[valueKey] as unknown[])?.map((x: unknown) => (x as { value: unknown }).value);
      return { ...prev, [key]: val };
    }, {}) ?? {}
  );
}

export const allowMetaKey = (event: KeyboardEvent): boolean => {
  if (
    [
      'Delete',
      'Backspace',
      'Tab',
      'Escape',
      'Enter',
      'NumLock',
      'ArrowLeft',
      'ArrowRight',
      'End',
      'Home',
    ].indexOf(event.key) !== -1 ||
    (event.key === 'a' && (event.ctrlKey || event.metaKey)) ||
    (event.key === 'c' && (event.ctrlKey || event.metaKey)) ||
    (event.key === 'v' && (event.ctrlKey || event.metaKey)) ||
    (event.key === 'x' && (event.ctrlKey || event.metaKey))
  ) {
    return true;
  }
  return false;
};

export const onlyNumber = (event: KeyboardEvent & { target: HTMLInputElement }, allowKey = '') => {
  if (allowMetaKey(event)) return;
  if (event.key.search(/[^0-9]/) >= 0 && !allowKey.includes(event.key)) {
    event.preventDefault();
  }
};

export function transformReq(data: Record<string, unknown> | null | undefined): Record<string, unknown> {
  const obj = { ...(data ?? {}) };
  Object.keys(obj).forEach(
    (k) => (obj[k] = typeof obj[k] === 'string' ? String(obj[k]).trim() : obj[k])
  );
  return obj;
}

interface AttributesData {
  [key: string]: string[];
}

export function formatAttributes(attributes: AttributesData): string {
  return Object.entries(attributes)
    .map(([key, values]) => `${key}: ${values.join(', ')}`)
    .join('\n');
}

export function getIdByName<T extends { id: string; name: string; children?: T[] }>(
  arr: T[],
  name: string,
  idKey: keyof T | string = 'id',
  nameKey: keyof T | string = 'name'
): T | null {
  for (let i = 0; i < arr.length; i += 1) {
    if ((arr[i] as Record<string, unknown>)[nameKey as string] === name) {
      return arr[i];
    }
    if (arr[i].children?.length) {
      const found = getIdByName(arr[i].children!, name, idKey, nameKey);
      if (found) return found;
    }
  }
  return null;
}
