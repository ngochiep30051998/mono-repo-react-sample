import clsx from 'clsx';
import { cache, AUTH_ADMIN_CACHE_KEY } from '@core';
import { useThemeStore } from '@theme';
import { useMediaQuery } from '@hooks';
import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import AppButton from '@atoms/atoms/AppButton';
import { useNavigate } from 'react-router';
import UserDropdown from '@molecules/UserDropdown';
import ThemeToggleBtn from '@molecules/ThemeToggleBtn';
import NotificationBell from '@molecules/NotificationBell';
type AppHeaderProps = {
  title: string;
  logo: React.ReactNode;
  userMenuItems: MenuProps['items'];
  authCacheKey?: string;
};
export default function AppHeader({
  title, logo = <DashboardOutlined className="text-2xl" />, userMenuItems,
  authCacheKey = AUTH_ADMIN_CACHE_KEY,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const { menuDesktopOpen, toggleMenuDesktopOpen, setMobileDrawerOpen, themeMode, toggleTheme } = useThemeStore();
  const isMobile = !useMediaQuery('(min-width: 992px)');
  const isDark = themeMode === 'dark';

  const cached = cache.getCache(authCacheKey)?.data as { username?: string } | undefined;
  const username = cached?.username ?? 'User';

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
      {/* Left */}
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer text-white text-xl font-bold hover:scale-105 transition-transform"
          onClick={() => navigate('/')}
        >
          {logo}
          <span className="hidden md:inline">{title}</span>
        </div>
        <AppButton
          type="text"
          className="!text-white !text-lg !rounded-lg hover:!bg-white/15 transition-all"
          icon={isMobile ? <MenuUnfoldOutlined /> : menuDesktopOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => (isMobile ? setMobileDrawerOpen(true) : toggleMenuDesktopOpen())}
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ThemeToggleBtn isDark={isDark} onToggle={toggleTheme} />
        <NotificationBell count={5} />
        <UserDropdown username={username} menuItems={userMenuItems} />
      </div>
    </div>
  );
}
