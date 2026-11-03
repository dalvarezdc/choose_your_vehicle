import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeColors {
  text: string
  muted: string
  border: string
  surface: string
  accent: string
  dim: string
}

export const THEME_COLORS: Record<Theme, ThemeColors> = {
  dark: { text: '#e7e9ee', muted: '#9aa3b2', border: '#2a303c', surface: '#161a22', accent: '#f97316', dim: '#3a4150' },
  light: { text: '#141821', muted: '#5b6474', border: '#e3e6ec', surface: '#ffffff', accent: '#ea580c', dim: '#d3d8e0' },
}

const KEY = 'cyv-theme'

function initialTheme(): Theme {
  const saved = localStorage.getItem(KEY)
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(KEY, theme)
  }, [theme])
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}
