import { cache, AUTH_VENDOR_CACHE_KEY } from '@core';
import { useAuthStore } from '@stores';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AppHeader } from '@ui';
import { useNavigate } from 'react-router';

export default function VendorHeader() {
  const navigate = useNavigate();
  const clearRolesAndPermissions = useAuthStore((s) => s.clearRolesAndPermissions);

  const handleLogout = () => {
    cache.remove(AUTH_VENDOR_CACHE_KEY);
    clearRolesAndPermissions();
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile', onClick: () => {} },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', danger: true, onClick: handleLogout },
  ];

  return <AppHeader title="Vendor Portal" logo={<DashboardOutlined className="text-2xl" />} userMenuItems={userMenuItems} authCacheKey=''/>
}

