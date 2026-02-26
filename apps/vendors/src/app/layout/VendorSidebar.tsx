import { AppSidebar } from '@ui';
import type { IMenuItem } from '@shared-types';
import { useThemeStore } from '@theme';

interface VendorSidebarProps {
  menuItems: IMenuItem[];
  onItemClick?: () => void;
  forceExpanded?: boolean;
}

export default function VendorSidebar({ menuItems, onItemClick, forceExpanded }: VendorSidebarProps) {
  const { menuDesktopOpen } = useThemeStore();
  const expanded = forceExpanded ?? menuDesktopOpen;


  return <AppSidebar menuItems={menuItems} onItemClick={onItemClick} forceExpanded={expanded} />
}

