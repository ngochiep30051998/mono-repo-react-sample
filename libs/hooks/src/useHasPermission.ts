import { getPermissionsForRoles } from '@core';
import { useAuthStore } from '@stores';

export function useHasPermission(permission: string): boolean {
  const roles = useAuthStore((s) => s.roles);
  const permissions = useAuthStore((s) => s.permissions);

  if (!permission) return true;
  if (permissions?.includes(permission)) return true;
  if (roles.length) {
    const rolePerms = getPermissionsForRoles(roles);
    return rolePerms.includes(permission);
  }
  return false;
}

const NO_PERMISSION = '__no_permission__';

export function useHasAnyPermission(
  editPermission?: string,
  deletePermission?: string,
  viewPermission?: string
): boolean {
  const hasEdit = useHasPermission(editPermission ?? NO_PERMISSION);
  const hasDelete = useHasPermission(deletePermission ?? NO_PERMISSION);
  const hasView = useHasPermission(viewPermission ?? NO_PERMISSION);
  return hasEdit || hasDelete || hasView;
}
