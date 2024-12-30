'use client'

import { useTheme } from '@/contexts/ThemeContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import classNames from 'classnames'
import { useLocalStorageState, useMount } from 'ahooks'
import { Theme } from '@/contexts/ThemeContext/types'

import s from './index.module.scss'


export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { theme, setTheme } = useTheme()
    const bgClasses = [s.bg0, s.bg1, s.bg2]
    const [localMode] = useLocalStorageState<Theme | undefined>("localMode")

    useMount(() => {
        if (localMode !== undefined && localMode !== null && isValidTheme(localMode)) {
            setTheme(localMode)
        }
    })

    return (
        <div className={classNames(s.AppBox, bgClasses[theme])}>
            <Nav />
            <main className={s.main}>
                <div className={s.center}>
                    {children}
                </div>
            </main>
            <Footer />
            <BackToTop />
        </div>
    )
}

// 类型检查函数
function isValidTheme(value: unknown): value is Theme {
    return typeof value === 'number' && [0, 1, 2].includes(value as number)
}