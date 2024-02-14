import React from 'react';
import { Sidebar } from './sidebar.styles';
import { Avatar, Tooltip } from '@nextui-org/react';
import { CompaniesDropdown } from './companies-dropdown';
import { HomeIcon } from '../icons/sidebar/home-icon';
import { PaymentsIcon } from '../icons/sidebar/payments-icon';
import { BalanceIcon } from '../icons/sidebar/balance-icon';
import { AccountsIcon } from '../icons/sidebar/accounts-icon';
import { CustomersIcon } from '../icons/sidebar/customers-icon';
import { ProductsIcon } from '../icons/sidebar/products-icon';
import { ReportsIcon } from '../icons/sidebar/reports-icon';
import { DevIcon } from '../icons/sidebar/dev-icon';
import { ViewIcon } from '../icons/sidebar/view-icon';
import { SettingsIcon } from '../icons/sidebar/settings-icon';
import { CollapseItems } from './collapse-items';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { FilterIcon } from '../icons/sidebar/filter-icon';
import { useSidebarContext } from '../layout/layout-context';
import { ChangeLogIcon } from '../icons/sidebar/changelog-icon';
import { usePathname } from 'next/navigation';
import { CitiesIcon } from '../icons/sidebar/cities-icon';

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" icon={<HomeIcon />} isActive={pathname === '/dashboard'} href="/dashboard" />
            <SidebarMenu title="Data">
              <SidebarItem isActive={pathname === '/dashboard/students'} title="Students" icon={<CustomersIcon />} href="/dashboard/students" />
              <SidebarItem isActive={pathname === '/dashboard/cities'} title="Cities" icon={<CitiesIcon />} href="/dashboard/cities" />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
