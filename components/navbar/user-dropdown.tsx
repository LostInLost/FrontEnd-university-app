import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarItem } from '@nextui-org/react';
import React from 'react';
import { DarkModeSwitch } from './darkmodeswitch';
import defaultAvatar from '@/public/defaultAvatar.png';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const UserDropdown = ({ session }: { session: any }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    return router.push('/');
  };
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as="button" color="secondary" size="md" src={defaultAvatar.src} isBordered />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        // onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem key="profile" className="flex flex-col justify-start w-full items-start">
          <p>Signed in as</p>
          <p>{session?.user?.name}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger " onClick={handleLogout}>
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
