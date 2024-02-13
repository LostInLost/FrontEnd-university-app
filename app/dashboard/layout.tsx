import { Layout } from '@/components/layout/layout';
import React from 'react'
import SideBarLayout from './SideBarLayout';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <SideBarLayout>
        {children}
    </SideBarLayout>
  )
}
