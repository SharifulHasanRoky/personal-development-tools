'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'accent' | 'warning' | 'danger'
  showLabel?: boolean
  label?: string
  animated?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-surface-600 dark:text-surface-400">{label}</span>}
          {showLabel && <span className="text-xs font-medium text-surface-500">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden',
          {
            'h-1.5': size === 'sm',
            'h-2.5': size === 'md',
            'h-4': size === 'lg',
          }
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out',
            {
              'bg-gradient-to-r from-primary-400 to-primary-600': color === 'primary',
              'bg-gradient-to-r from-accent-400 to-accent-600': color === 'accent',
              'bg-gradient-to-r from-yellow-400 to-orange-500': color === 'warning',
              'bg-gradient-to-r from-red-400 to-red-600': color === 'danger',
            },
            animated && 'animate-[grow_1s_ease-out]'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
