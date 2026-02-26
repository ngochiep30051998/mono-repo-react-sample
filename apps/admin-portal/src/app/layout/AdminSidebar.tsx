import { AppMenu, AppSidebar } from '@ui';
import type { IMenuItem } from '@shared-types';

interface AdminSidebarProps {
  menuItems: IMenuItem[];
  onItemClick?: () => void;
  forceExpanded?: boolean;
}


export default function AdminSidebar({ menuItems, onItemClick, forceExpanded }: AdminSidebarProps) {
  return <AppSidebar menuItems={menuItems} onItemClick={onItemClick} forceExpanded={forceExpanded} />
}
