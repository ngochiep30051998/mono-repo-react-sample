import clsx from 'clsx';
import { cache, AUTH_USER_CACHE_KEY } from '@core';
import { useAuthStore } from '@features/admin/auth';
import { useThemeStore } from '@theme';
import { useMediaQuery } from '@hooks';
import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AppButton, UserDropdown, ThemeToggleBtn, NotificationBell } from '@ui';
import { useNavigate } from 'react-router';

export default function AppHeader() {
  const navigate = useNavigate();
  const { menuDesktopOpen, toggleMenuDesktopOpen, setMobileDrawerOpen, themeMode, toggleTheme } = useThemeStore();
  const isMobile = !useMediaQuery('(min-width: 992px)');
  const isDark = themeMode === 'dark';

  const cached = cache.getCache(AUTH_USER_CACHE_KEY)?.data as { username?: string } | undefined;
  const username = cached?.username ?? 'User';
  const clearRolesAndPermissions = useAuthStore((s) => s.clearRolesAndPermissions);

  const handleLogout = () => {
    cache.remove(AUTH_USER_CACHE_KEY);
    clearRolesAndPermissions();
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile', onClick: () => {} },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', danger: true, onClick: handleLogout },
  ];

  return (
    <div
      className={clsx(
        'sticky top-0 z-50 flex items-center justify-between',
        'h-16 px-6 shadow-md',
        isDark
          ? 'bg-gradient-to-r from-gray-800 to-gray-900'
          : 'bg-gradient-to-r from-primary to-accent'
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer text-white text-xl font-bold hover:scale-105 transition-transform"
          onClick={() => navigate('/')}
        >
          <DashboardOutlined className="text-2xl" />
          <span className="hidden md:inline">Admin Panel</span>
        </div>
        <AppButton
          type="text"
          className="!text-white !text-lg !rounded-lg hover:!bg-white/15 transition-all"
          icon={isMobile ? <MenuUnfoldOutlined /> : menuDesktopOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => (isMobile ? setMobileDrawerOpen(true) : toggleMenuDesktopOpen())}
        />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggleBtn isDark={isDark} onToggle={toggleTheme} />
        <NotificationBell count={5} />
        <UserDropdown username={username} menuItems={userMenuItems} />
      </div>
    </div>
  );
}
