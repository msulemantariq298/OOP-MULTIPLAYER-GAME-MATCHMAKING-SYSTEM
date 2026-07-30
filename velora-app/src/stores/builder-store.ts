import { create } from 'zustand'
import { Bead, PlacedBead, BuilderState } from '@/types'
import { generateId } from '@/lib/utils'

interface BuilderStore extends BuilderState {
  name: string
  addBead: (bead: Bead) => void
  removeBead: (id: string) => void
  reorderBead: (startIndex: number, endIndex: number) => void
  selectBead: (id: string | null) => void
  setName: (name: string) => void
  undo: () => void
  redo: () => void
  setZoom: (zoom: number) => void
  setBaseType: (type: 'bracelet' | 'necklace' | 'anklet') => void
  calculatePrice: () => void
  resetBuilder: () => void
  loadDesign: (design: any) => void
}

const BASE_PRICES = {
  bracelet: 49.99,
  necklace: 89.99,
  anklet: 39.99,
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  baseType: 'bracelet',
  placedBeads: [],
  selectedBeadId: null,
  history: [[]],
  historyIndex: 0,
  zoom: 1,
  totalPrice: BASE_PRICES['bracelet'],
  name: '',

  calculatePrice: () => {
    const { baseType, placedBeads } = get()
    const beadsTotal = placedBeads.reduce((total, pb) => total + pb.bead.price, 0)
    set({ totalPrice: BASE_PRICES[baseType] + beadsTotal })
  },

  addBead: (bead) => {
    const { placedBeads, history, historyIndex } = get()
    
    const newBead: PlacedBead = {
      id: generateId(),
      bead,
      position: placedBeads.length,
    }
    
    const newPlacedBeads = [...placedBeads, newBead]
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newPlacedBeads)
    
    set({ 
      placedBeads: newPlacedBeads,
      history: newHistory,
      historyIndex: newHistory.length - 1
    })
    
    get().calculatePrice()
  },

  removeBead: (id) => {
    const { placedBeads, history, historyIndex } = get()
    
    const newPlacedBeads = placedBeads
      .filter((pb) => pb.id !== id)
      .map((pb, index) => ({ ...pb, position: index }))
      
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newPlacedBeads)
    
    set({ 
      placedBeads: newPlacedBeads,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      selectedBeadId: get().selectedBeadId === id ? null : get().selectedBeadId
    })
    
    get().calculatePrice()
  },

  reorderBead: (startIndex, endIndex) => {
    const { placedBeads, history, historyIndex } = get()
    const newPlacedBeads = Array.from(placedBeads)
    
    const [reorderedItem] = newPlacedBeads.splice(startIndex, 1)
    newPlacedBeads.splice(endIndex, 0, reorderedItem)
    
    // Update positions
    const updatedBeads = newPlacedBeads.map((pb, index) => ({ ...pb, position: index }))
    
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(updatedBeads)
    
    set({ 
      placedBeads: updatedBeads,
      history: newHistory,
      historyIndex: newHistory.length - 1
    })
  },

  selectBead: (id) => set({ selectedBeadId: id }),

  setName: (name) => set({ name }),

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      set({ 
        historyIndex: historyIndex - 1,
        placedBeads: history[historyIndex - 1]
      })
      get().calculatePrice()
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      set({ 
        historyIndex: historyIndex + 1,
        placedBeads: history[historyIndex + 1]
      })
      get().calculatePrice()
    }
  },

  setZoom: (zoom) => set({ zoom }),

  setBaseType: (baseType) => {
    set({ baseType })
    get().calculatePrice()
  },

  resetBuilder: () => {
    set({
      baseType: 'bracelet',
      placedBeads: [],
      selectedBeadId: null,
      history: [[]],
      historyIndex: 0,
      zoom: 1,
      totalPrice: BASE_PRICES['bracelet'],
      name: '',
    })
  },

  loadDesign: (design) => {
    // Assuming design_data contains placedBeads
    const placedBeads = design.design_data.placedBeads || []
    set({
      baseType: design.base_type,
      placedBeads: placedBeads,
      selectedBeadId: null,
      history: [placedBeads],
      historyIndex: 0,
      zoom: 1,
      totalPrice: design.total_price,
      name: design.name || '',
    })
  }
}))
