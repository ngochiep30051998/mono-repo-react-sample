import type { IMenuItem } from '@shared-types';
import * as Dashboard from '@features/admin/feature-dashboard';
import * as Users from '@features/admin/feature-users';
import * as Products from '@features/admin/feature-products';
import * as Orders from '@features/admin/feature-orders';

const modules = [Dashboard, Users, Products, Orders];

export const MenuItems: IMenuItem[] = modules
  .map((x) => x.MenuItems)
  .reduce((prev, curr) => prev.concat(curr), []);

