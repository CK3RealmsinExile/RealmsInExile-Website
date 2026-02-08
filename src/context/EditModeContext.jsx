import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const IS_PRODUCTION = import.meta.env.PROD
const EDIT_MODE_ENABLED = import.meta.env.VITE_ENABLE_EDIT_MODE === 'true'

/**
 * Edit Mode Context
 * Manages application edit/view mode state
 */
const EditModeContext = createContext(null)

/**
 * Edit mode provider component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function EditModeProvider({ children }) {
  // Disable edit mode in production unless explicitly enabled
  const canEdit = !IS_PRODUCTION || EDIT_MODE_ENABLED
  
  // Initialize from localStorage, default to false (view mode)
  const [isEditMode, setIsEditMode] = useState(() => {
    if (!canEdit) return false
    const saved = localStorage.getItem('realmsinexile_editmode')
    return saved === 'true'
  })

  /**
   * Toggle between edit and view modes
   */
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev)
  }

  /**
   * Explicitly set edit mode
   */
  const enableEditMode = () => {
    setIsEditMode(true)
  }

  /**
   * Explicitly set view mode
   */
  const disableEditMode = () => {
    setIsEditMode(false)
  }

  // Persist to localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem('realmsinexile_editmode', isEditMode.toString())
  }, [isEditMode])

  // Keyboard shortcut: Press 'E' to toggle (only when not typing in input)
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input/textarea
      if (
        e.key === 'e' &&
        !e.ctrlKey &&
        !e.metaKey &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        toggleEditMode()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  if (!canEdit) {
    return (
      <EditModeContext.Provider value={{ 
        isEditMode: false, 
        toggleEditMode: () => {}, 
        enableEditMode: () => {}, 
        disableEditMode: () => {} 
      }}>
        {children}
      </EditModeContext.Provider>
    )
  }

  const value = {
    isEditMode,
    toggleEditMode,
    enableEditMode,
    disableEditMode,
  }

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  )
}

EditModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Custom hook to consume edit mode context
 * 
 * @returns {Object} Edit mode state and controls
 */
export function useEditMode() {
  const context = useContext(EditModeContext)
  if (!context) {
    throw new Error('useEditMode must be used within EditModeProvider')
  }
  return context
}