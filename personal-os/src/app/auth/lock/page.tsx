'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { Sparkles, Lock } from 'lucide-react'

export default function LockScreenPage() {
  const router = useRouter()
  const { user, unlock, logout } = useAuthStore()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit
      setPin(newPin)
      if (newPin.length === 4) {
        const success = unlock(newPin)
        if (success) {
          router.push('/dashboard')
        } else {
          setError('Incorrect PIN')
          setPin('')
        }
      }
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mb-4 shadow-lg shadow-primary-500/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-surface-900 dark:text-white">Locked</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">
            {user?.fullName || 'User'}
          </p>
        </div>

        <div className="glass-card p-8">
          {/* PIN dots */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  i < pin.length
                    ? 'bg-primary-500 scale-110'
                    : 'bg-surface-200 dark:bg-surface-700'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          {/* Number pad */}
          <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((digit) => (
              <button
                key={digit}
                onClick={() => digit === '⌫' ? handleBackspace() : digit && handlePinInput(digit)}
                disabled={!digit}
                className={`
                  w-16 h-16 rounded-2xl text-xl font-semibold transition-all duration-200
                  ${digit ? 'bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-white active:scale-95' : ''}
                  ${!digit ? 'invisible' : ''}
                `}
              >
                {digit}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={logout}
              className="text-sm text-surface-500 hover:text-red-500 transition-colors"
            >
              Sign out instead
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs text-surface-400 dark:text-surface-500">
          Default PIN: Set one in Settings
        </p>
      </div>
    </div>
  )
}
