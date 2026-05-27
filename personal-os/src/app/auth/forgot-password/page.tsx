'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email')
      return
    }

    // Simulate sending reset email
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-4 shadow-lg shadow-primary-500/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Reset Password</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">We&apos;ll send you a reset link</p>
        </div>

        <div className="glass-card p-8">
          {sent ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-accent-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">Check your email</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
                We&apos;ve sent a password reset link to <strong>{email}</strong>
              </p>
              <Link href="/auth/login">
                <Button variant="secondary" className="w-full">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
              />

              {error && (
                <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                Send Reset Link
              </Button>

              <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 mt-4">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
