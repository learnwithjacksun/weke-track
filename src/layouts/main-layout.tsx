import { Header } from '@/components/common'
import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <><div className='bg-secondary dark:bg-background min-h-[100dvh]'>

            <Header />

            <main className='max-w-[920px] w-[90%] mx-auto pt-5 '>
                {children}
            </main>
        </div>

        </>
    )
}
