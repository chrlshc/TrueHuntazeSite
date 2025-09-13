'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Search, Home, BarChart, Settings, Users, CreditCard, 
  FileText, HelpCircle, LogOut, Command, ArrowRight,
  Zap, MessageSquare, Calendar, TrendingUp
} from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ReactNode
  action: () => void
  keywords: string[]
  category: string
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'home',
      title: 'Go to Dashboard',
      icon: <Home className="w-4 h-4" />,
      action: () => router.push('/dashboard'),
      keywords: ['home', 'main', 'overview'],
      category: 'Navigation'
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'See your performance metrics',
      icon: <BarChart className="w-4 h-4" />,
      action: () => router.push('/analytics'),
      keywords: ['stats', 'metrics', 'data', 'performance'],
      category: 'Navigation'
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'View and manage conversations',
      icon: <MessageSquare className="w-4 h-4" />,
      action: () => router.push('/messages'),
      keywords: ['chat', 'conversations', 'inbox'],
      category: 'Navigation'
    },
    
    // Settings
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      action: () => router.push('/settings'),
      keywords: ['preferences', 'config', 'setup'],
      category: 'Settings'
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      icon: <CreditCard className="w-4 h-4" />,
      action: () => router.push('/billing'),
      keywords: ['payment', 'subscription', 'invoice'],
      category: 'Settings'
    }
  ]

  const filteredCommands = useMemo(() => {
    if (!query) return commands

    const searchQuery = query.toLowerCase()
    return commands.filter(cmd => 
      cmd.title.toLowerCase().includes(searchQuery) ||
      cmd.description?.toLowerCase().includes(searchQuery) ||
      cmd.keywords.some(k => k.includes(searchQuery))
    )
  }, [query])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen(true)
    }
    
    if (!isOpen) return
    
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!mounted || !isOpen) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-start justify-center pt-[20vh]"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl bg-[#0F0F10]/95 backdrop-blur-xl border border-[#2D2D30] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#2D2D30]">
            <Search className="w-5 h-5 text-[#9CA3AF]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-white placeholder-[#9CA3AF] outline-none text-base"
            />
            <kbd className="px-2 py-1 text-xs text-[#9CA3AF] bg-[#252528] rounded border border-[#2D2D30]">
              ESC
            </kbd>
          </div>

          {/* Commands List */}
          <div className="max-h-[400px] overflow-y-auto py-2">
            {filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action()
                  setIsOpen(false)
                }}
                className="w-full px-6 py-3 flex items-center gap-3 text-left transition-colors duration-150 text-[#EEEFF1] hover:bg-[#252528]"
              >
                <div className="text-[#9CA3AF]">
                  {cmd.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{cmd.title}</div>
                  {cmd.description && (
                    <div className="text-sm text-[#9CA3AF]">{cmd.description}</div>
                  )}
                </div>
              </button>
            ))}
            
            {filteredCommands.length === 0 && (
              <div className="px-6 py-8 text-center text-[#9CA3AF]">
                No commands found for "{query}"
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[#2D2D30] flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Navigate with arrow keys</span>
            <div className="flex items-center gap-1">
              <Command className="w-3 h-3" />
              <span>+K to open</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}