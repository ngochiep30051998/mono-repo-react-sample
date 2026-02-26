import type { IMenuItem } from '@shared-types';
import * as Dashboard from '@features/admin/feature-dashboard';
import * as Classes from '@features/vendors/feature-classes';

const modules = [Dashboard, Classes];

export const MenuItems: IMenuItem[] = modules
  .map((x) => x.MenuItems)
  .reduce((prev, curr) => prev.concat(curr), []);

