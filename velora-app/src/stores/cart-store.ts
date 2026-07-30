import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Coupon } from '@/types'
import { generateId, calculateDiscount } from '@/lib/utils'

interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getDiscount: () => number
  getItemCount: () => number
  applyCoupon: (coupon: Coupon | null) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (item) => {
        set((state) => {
          // Check if item already exists (for products only, designs are unique)
          if (item.type === 'product' && item.product) {
            const existingItemIndex = state.items.findIndex(
              (i) => i.type === 'product' && i.product?.id === item.product?.id
            )

            if (existingItemIndex !== -1) {
              const newItems = [...state.items]
              newItems[existingItemIndex].quantity += item.quantity
              return { items: newItems }
            }
          }

          return { items: [...state.items, { ...item, id: generateId() }] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [], coupon: null })
      },

      getSubtotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      getDiscount: () => {
        const { coupon, getSubtotal } = get()
        const subtotal = getSubtotal()
        
        if (!coupon) return 0
        return calculateDiscount(subtotal, coupon)
      },

      getTotal: () => {
        const { getSubtotal, getDiscount } = get()
        return Math.max(0, getSubtotal() - getDiscount())
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
      
      applyCoupon: (coupon) => {
        set({ coupon })
      }
    }),
    {
      name: 'velora-cart',
    }
  )
)
