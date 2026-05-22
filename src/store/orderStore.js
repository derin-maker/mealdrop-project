import { create } from 'zustand'

const useOrderStore = create((set, get) => ({
  orders: JSON.parse(localStorage.getItem('orders')) || [],

  placeOrder: (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: 'confirmed',
      placedAt: new Date().toISOString(),
    }
    const updated = [newOrder, ...get().orders]
    localStorage.setItem('orders', JSON.stringify(updated))
    set({ orders: updated })
    return newOrder
  },

  updateStatus: (id, status) => {
    const updated = get().orders.map(o =>
      o.id === id ? { ...o, status } : o
    )
    localStorage.setItem('orders', JSON.stringify(updated))
    set({ orders: updated })
  },

  getOrder: (id) => {
    return get().orders.find(o => o.id === id)
  },
}))

export default useOrderStore