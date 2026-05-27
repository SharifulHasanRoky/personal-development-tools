'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'
import {
  LayoutDashboard,
  Brain,
  Calendar,
  Target,
  Zap,
  Repeat,
  DollarSign,
  BookOpen,
  FileText,
  Database,
  FolderKanban,
  BarChart3,
  Image,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Lock,
  Sparkles,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/ai-mentor', label: 'AI Mentor', icon: Brain },
  { href: '/daily-planner', label: 'Daily Planner', icon: Calendar },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/skills', label: 'Skills', icon: Zap },
  { href: '/habits', label: 'Habits', icon: Repeat },
  { href: '/finance', label: 'Finance', icon: DollarSign },
  { href: '/journal', label: 'Journal', icon: BookOpen },
  { href: '/notes', label: 'Notes', icon: FileText },
  { href: '/knowledge-vault', label: 'Knowledge Vault', icon: Database },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/vision-board', label: 'Vision Board', icon: Image },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme, sidebarCollapsed, toggleSidebar } = useAppStore()
  const { logout, lock } = useAuthStore()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out',
        'glass-sidebar flex flex-col',
        sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-surface-200/50 dark:border-surface-800/50">
        <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-gradient truncate">Personal OS</h1>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                'hover:bg-surface-100 dark:hover:bg-surface-800/60',
                isActive && 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 shadow-sm',
                !isActive && 'text-surface-600 dark:text-surface-400',
                sidebarCollapsed && 'justify-center px-2'
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-primary-500')} />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-surface-200/50 dark:border-surface-800/50 space-y-1">
        <button
          onClick={toggleTheme}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200',
            'hover:bg-surface-100 dark:hover:bg-surface-800/60 text-surface-600 dark:text-surface-400',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!sidebarCollapsed && <span className="text-sm font-medium">Toggle Theme</span>}
        </button>

        <button
          onClick={lock}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200',
            'hover:bg-surface-100 dark:hover:bg-surface-800/60 text-surface-600 dark:text-surface-400',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          <Lock className="w-5 h-5" />
          {!sidebarCollapsed && <span className="text-sm font-medium">Lock</span>}
        </button>

        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200',
            'hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="w-5 h-5" />
          {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200',
            'hover:bg-surface-100 dark:hover:bg-surface-800/60 text-surface-600 dark:text-surface-400',
            sidebarCollapsed && 'justify-center px-2'
          )}
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!sidebarCollapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
