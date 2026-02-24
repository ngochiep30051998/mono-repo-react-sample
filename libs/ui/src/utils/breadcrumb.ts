export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [{ title: 'Home', path: '/' }];
  return segments.map((segment, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    return { title: segment, path };
  });
}
