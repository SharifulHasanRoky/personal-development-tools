'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          {
            'bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-sm': variant === 'default',
            'glass-card': variant === 'glass',
            'border-2 border-surface-200 dark:border-surface-700': variant === 'bordered',
          },
          {
            'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20': hover,
          },
          {
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'
