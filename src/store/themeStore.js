import { create } from 'zustand'

const useThemeStore = create((set) => ({
  mode: localStorage.getItem('themeMode') || 'light',
  toggleMode: () => set((state) => {
    const next = state.mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('themeMode', next)
    return { mode: next }
  }),
}))

export default useThemeStore