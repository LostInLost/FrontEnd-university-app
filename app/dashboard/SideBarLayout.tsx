'use client'

import { Layout } from '@/components/layout/layout'
import React from 'react'

export default function SideBarLayout({children, session} : {children: React.ReactNode, session: any}) {
  return (
    <Layout session={session}>
        {children}
    </Layout>
  )
}
