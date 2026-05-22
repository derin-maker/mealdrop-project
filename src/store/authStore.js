import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,

  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    set({ user: userData })
  },

  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },

  updateUser: (data) => {
    const updated = { ...JSON.parse(localStorage.getItem('user')), ...data }
    localStorage.setItem('user', JSON.stringify(updated))
    set({ user: updated })
  },
}))

export default useAuthStore