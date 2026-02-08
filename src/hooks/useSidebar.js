import { useState, useCallback } from 'react'

/**
 * Custom hook for sidebar state management
 * 
 * @returns {Object} Sidebar state and handlers
 */
export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState(null)

  const open = useCallback((newContent = null) => {
    setContent(newContent)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    // Delay clearing content for animation
    setTimeout(() => setContent(null), 300)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return {
    isOpen,
    content,
    open,
    close,
    toggle,
  }
}