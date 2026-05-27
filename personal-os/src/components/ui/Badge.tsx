'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'accent' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        {
          'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300': variant === 'default',
          'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300': variant === 'primary',
          'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300': variant === 'accent',
          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300': variant === 'warning',
          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300': variant === 'danger',
          'border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400': variant === 'outline',
        },
        {
          'text-xs px-2 py-0.5': size === 'sm',
          'text-sm px-3 py-1': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
