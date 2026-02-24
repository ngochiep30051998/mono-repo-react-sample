export function fuzzySearch(pattern: string, source: string) {
  const hlen = source.length;
  const nlen = pattern.length;
  if (nlen > hlen) return false;
  if (nlen === hlen) return pattern === source;
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = pattern.charCodeAt(i);
    while (j < hlen) {
      if (source.charCodeAt(j++) === nch) continue outer;
    }
    return false;
  }
  return true;
}

export function search(value: unknown[], keys: string, term: string): unknown[] {
  if (!term) return value ?? [];
  let searchTerm = term;
  if (searchTerm.startsWith('+')) {
    searchTerm = searchTerm.replace(/^(\+)/, '\\+');
  }
  const re = new RegExp(searchTerm, 'gi');
  return (value || []).filter((item: unknown) =>
    keys.split(',').some((key) => {
      const obj = item as Record<string, unknown>;
      return Object.prototype.hasOwnProperty.call(obj, key) && re.test(String(obj[key]));
    })
  );
}
