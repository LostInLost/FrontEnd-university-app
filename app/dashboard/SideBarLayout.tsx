'use client'

import { Layout } from '@/components/layout/layout'
import React from 'react'

export default function SideBarLayout({children} : {children: React.ReactNode}) {
  return (
    <Layout>
        {children}
    </Layout>
  )
}
