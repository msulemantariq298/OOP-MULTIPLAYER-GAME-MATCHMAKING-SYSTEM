import { create } from 'zustand'

interface UIState {
  isMobileMenuOpen: boolean
  isMobileNavOpen: boolean
  isCartOpen: boolean
  isSearchOpen: boolean
  toggleMobileMenu: () => void
  toggleMobileNav: () => void
  closeMobileNav: () => void
  toggleCart: () => void
  toggleSearch: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isMobileNavOpen: false,
  isCartOpen: false,
  isSearchOpen: false,

  toggleMobileMenu: () => set((state) => ({
    isMobileMenuOpen: !state.isMobileMenuOpen,
    isMobileNavOpen: false,
    isCartOpen: false,
    isSearchOpen: false,
  })),

  toggleMobileNav: () => set((state) => ({
    isMobileNavOpen: !state.isMobileNavOpen,
    isMobileMenuOpen: false,
    isCartOpen: false,
    isSearchOpen: false,
  })),

  closeMobileNav: () => set({
    isMobileNavOpen: false,
    isMobileMenuOpen: false,
  }),

  toggleCart: () => set((state) => ({
    isCartOpen: !state.isCartOpen,
    isMobileMenuOpen: false,
    isMobileNavOpen: false,
    isSearchOpen: false,
  })),

  toggleSearch: () => set((state) => ({
    isSearchOpen: !state.isSearchOpen,
    isMobileMenuOpen: false,
    isMobileNavOpen: false,
    isCartOpen: false,
  })),
}))
