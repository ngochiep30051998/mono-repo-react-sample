import { sleep } from '@core';
import { ROLES } from '@core';

export function getRolesForUsername(username: string): string[] {
  const normalized = username?.trim().toLowerCase() ?? '';
  if (normalized === 'admin') return [ROLES.ADMIN];
  if (normalized === 'manager') return [ROLES.MANAGER];
  return [ROLES.USER];
}

export async function getRolesFromBackend(username: string): Promise<string[]> {
  await sleep(600);
  return getRolesForUsername(username);
}
