'use client'

import { createContext, useContext, useState } from 'react'
import { ThemeContextType, ThemeProviderProps, Theme } from './types'


const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(0)
    const [navShow, setNavShow] = useState<boolean>(true)


    return (
        <ThemeContext.Provider value={{ theme, setTheme, navShow, setNavShow }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}