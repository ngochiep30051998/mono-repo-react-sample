import { useAuthStore } from '@stores';

export function useHasPermission(permission: string): boolean {
  const permissions = useAuthStore((s) => s.permissions);
  return permissions.includes(permission);
}

export function useHasAnyPermission(...permissionsToCheck: string[]): boolean {
  const permissions = useAuthStore((s) => s.permissions);
  return permissionsToCheck.some((p) => permissions.includes(p));
}

