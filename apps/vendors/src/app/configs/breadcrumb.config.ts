import { getBreadcrumbItemsFromMap } from '@core';

export const BREADCRUMB_MAP: Record<string, string> = {
  '/': 'Dashboard',
  '/users': 'User Management',
  '/users/create': 'Create User',
  '/users/:id': 'User detail',
  '/products': 'Product Management',
  '/products/:id': 'Product detail',
  '/orders': 'Order Management',
  '/orders/:id': 'Order detail',
};

export function getBreadcrumbItems(pathname: string) {
  return getBreadcrumbItemsFromMap(pathname, BREADCRUMB_MAP, { defaultRootTitle: 'Dashboard' });
}

