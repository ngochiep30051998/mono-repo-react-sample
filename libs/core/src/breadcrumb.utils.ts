export interface BreadcrumbItemFromMap {
  title: string;
  path?: string;
}

/**
 * Builds breadcrumb items from pathname and a path→title map.
 * Supports :param patterns (e.g. '/users/:id' matches '/users/123').
 */
export function getBreadcrumbItemsFromMap(
  pathname: string,
  pathToTitleMap: Record<string, string>,
  options?: { defaultRootTitle?: string }
): BreadcrumbItemFromMap[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItemFromMap[] = [];
  let currentPath = '';

  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    const exactMatch = pathToTitleMap[currentPath];
    const paramMatch = Object.keys(pathToTitleMap).find((key) => {
      const pattern = key.replace(/:[^/]+/g, '[^/]+');
      return new RegExp(`^${pattern}$`).test(currentPath);
    });
    const label =
      exactMatch ?? (paramMatch ? pathToTitleMap[paramMatch] : segments[i]) ?? currentPath;
    items.push({
      title: label,
      path: i < segments.length - 1 ? currentPath : undefined,
    });
  }

  if (items.length === 0 && pathname === '/') {
    const rootTitle = options?.defaultRootTitle ?? pathToTitleMap['/'] ?? 'Home';
    items.push({ title: rootTitle, path: undefined });
  }

  return items;
}
