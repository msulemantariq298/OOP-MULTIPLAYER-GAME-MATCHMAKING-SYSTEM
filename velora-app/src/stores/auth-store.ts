import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { UserProfile } from '@/types'

interface AuthState {
  user: any | null
  profile: UserProfile | null
  session: any | null
  isLoading: boolean
  isAdmin: boolean
  signIn: () => Promise<void>
  signUp: () => Promise<void>
  signOut: () => Promise<void>
  getSession: () => Promise<void>
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  isAdmin: false,

  signIn: async () => {
    // Implemented in component via supabase client
  },
  
  signUp: async () => {
    // Implemented in component via supabase client
  },

  signOut: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null, session: null, profile: null, isAdmin: false })
  },

  getSession: async () => {
    const supabase = createClient()
    set({ isLoading: true })
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) throw error
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          
        const { data: userRecord } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          
        set({ 
          session, 
          user: session.user, 
          profile: profile as UserProfile,
          isAdmin: userRecord?.role === 'admin',
          isLoading: false 
        })
      } else {
        set({ session: null, user: null, profile: null, isAdmin: false, isLoading: false })
      }
    } catch (error) {
      console.error('Error getting session:', error)
      set({ session: null, user: null, profile: null, isAdmin: false, isLoading: false })
    }
  },

  updateProfile: async (updates) => {
    const supabase = createClient()
    const { user, profile } = get()
    
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single()
        
      if (error) throw error
      
      set({ profile: { ...profile, ...data } as UserProfile })
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }
}))
