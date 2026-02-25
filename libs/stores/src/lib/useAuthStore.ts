import { create } from 'zustand';
import { cache, AUTH_ADMIN_CACHE_KEY } from '@core';
import { getPermissionsForRoles } from '@core';
import { getRolesForUsername } from '@services';

interface AuthState {
  roles: string[];
  permissions: string[];
  setRolesAndPermissions: (roles: string[], permissions: string[]) => void;
  clearRolesAndPermissions: () => void;
  hydrateFromCache: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  roles: [],
  permissions: [],

  setRolesAndPermissions: (roles, permissions) => set({ roles, permissions }),

  clearRolesAndPermissions: () => set({ roles: [], permissions: [] }),

  hydrateFromCache: () => {
    const cached = cache.getCache(AUTH_ADMIN_CACHE_KEY)?.data as { username?: string } | undefined;
    const username = cached?.username;
    if (!username) return;
    const roles = getRolesForUsername(username);
    const permissions = getPermissionsForRoles(roles);
    set({ roles, permissions });
  },
}));

export { useAuthStore };
