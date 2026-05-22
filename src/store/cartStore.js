import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],

  addItem: (item) => {
    const items = get().items
    const existing = items.find(i => i.id === item.id)
    let updated

    if (existing) {
      updated = items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    } else {
      updated = [...items, { ...item, quantity: 1 }]
    }

    localStorage.setItem('cart', JSON.stringify(updated))
    set({ items: updated })
  },

  removeItem: (id) => {
    const updated = get().items.filter(i => i.id !== id)
    localStorage.setItem('cart', JSON.stringify(updated))
    set({ items: updated })
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) return get().removeItem(id)
    const updated = get().items.map(i =>
      i.id === id ? { ...i, quantity } : i
    )
    localStorage.setItem('cart', JSON.stringify(updated))
    set({ items: updated })
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ items: [] })
  },

  getTotal: () => {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  getCount: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },
}))

export default useCartStore