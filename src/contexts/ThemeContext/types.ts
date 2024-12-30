import { ReactNode, Dispatch, SetStateAction } from 'react'


export type Theme = 0 | 1 | 2

export interface ThemeContextType {
    theme: Theme
    setTheme: Dispatch<SetStateAction<Theme>>
    navShow: boolean
    setNavShow: Dispatch<SetStateAction<boolean>>
}


export interface ThemeProviderProps {
    children: ReactNode
}
