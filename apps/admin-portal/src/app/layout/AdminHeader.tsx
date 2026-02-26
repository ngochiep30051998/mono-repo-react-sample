import clsx from 'clsx';
import { cache, AUTH_ADMIN_CACHE_KEY } from '@core';
import { useAuthStore } from '@stores';
import { useThemeStore } from '@theme';
import { useMediaQuery } from '@hooks';
import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AppButton, UserDropdown, ThemeToggleBtn, NotificationBell, AppHeader } from '@ui';
import { useNavigate } from 'react-router';

export default function AdminHeader() {
  const navigate = useNavigate();
  const clearRolesAndPermissions = useAuthStore((s) => s.clearRolesAndPermissions);
  const handleLogout = () => {
    cache.remove(AUTH_ADMIN_CACHE_KEY);
    clearRolesAndPermissions();
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile', onClick: () => {} },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', danger: true, onClick: handleLogout },
  ];

  return <AppHeader title='Admin portal' logo={<DashboardOutlined className="text-2xl" />} userMenuItems={userMenuItems} authCacheKey={AUTH_ADMIN_CACHE_KEY}/>
}
