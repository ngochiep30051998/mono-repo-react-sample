import { Link } from 'react-router';
import { IMenuItem } from '@shared-types';
import { getPermissionsForRoles } from '../config/rbac.config';
import useAuthStore from '../store/useAuthStore';

type GetItemProps = {
  to: string;
  label?: React.ReactNode;
};

function CustomLabel({ to, label }: GetItemProps) {
  return to ? (
    <Link to={to} style={{ color: 'inherit' }}>
      {label}
    </Link>
  ) : (
    label
  );
}

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  to?: string,
  children?: IMenuItem[],
  component?: React.ReactNode,
  onClick?: () => void,
  permission?: string
): IMenuItem {
  return {
    key,
    icon,
    children: children as IMenuItem[],
    label: to ? <CustomLabel to={to} label={label} /> : label,
    to,
    component,
    onClick,
    permission,
  };
}

function userHasPermission(permission: string | undefined): boolean {
  if (!permission) return true;
  const { roles, permissions } = useAuthStore.getState();
  if (permissions?.includes(permission)) return true;
  if (roles.length) {
    const rolePerms = getPermissionsForRoles(roles);
    return rolePerms.includes(permission);
  }
  return false;
}

export function filterMenuByPermission(items: IMenuItem[]): IMenuItem[] {
  const result: IMenuItem[] = [];
  for (const item of items) {
    const filteredChildren = item.children?.length
      ? filterMenuByPermission(item.children)
      : undefined;
    const hasVisibleChildren = filteredChildren && filteredChildren.length > 0;
    const hasPermission = userHasPermission(item.permission);
    if (!hasPermission && !hasVisibleChildren) continue;
    result.push({ ...item, children: filteredChildren });
  }
  return result;
}
