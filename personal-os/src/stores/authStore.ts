import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isLocked: boolean
  pin: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, fullName: string) => Promise<boolean>
  logout: () => void
  lock: () => void
  unlock: (pin: string) => boolean
  setPin: (pin: string) => void
  setUser: (user: User) => void
}

// Demo user for development
const demoUser: User = {
  id: '1',
  email: 'user@personalos.app',
  fullName: 'Alex Developer',
  level: 12,
  xp: 2450,
  createdAt: '2024-01-01',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isLocked: false,
      pin: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        // Simulate API call - in production, use Supabase auth
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (email && password.length >= 6) {
          set({
            user: { ...demoUser, email },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }
        set({ isLoading: false })
        return false
      },

      register: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (email && password.length >= 6 && fullName) {
          set({
            user: { ...demoUser, email, fullName },
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }
        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLocked: false,
        })
      },

      lock: () => {
        set({ isLocked: true })
      },

      unlock: (pin: string) => {
        const storedPin = get().pin
        if (storedPin === pin) {
          set({ isLocked: false })
          return true
        }
        return false
      },

      setPin: (pin: string) => {
        set({ pin })
      },

      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'personal-os-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pin: state.pin,
      }),
    }
  )
)
