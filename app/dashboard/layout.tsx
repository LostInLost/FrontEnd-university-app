import React from 'react';
import SideBarLayout from './SideBarLayout';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '../api/auth/[...nextauth]/AuthOptions';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(AuthOptions);
  return <SideBarLayout session={session}>{children}</SideBarLayout>;
}
