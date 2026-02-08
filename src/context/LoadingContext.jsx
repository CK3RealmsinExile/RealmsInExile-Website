import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

/**
 * Loading state context
 * Manages application-wide loading states for different operations
 * 
 * This provides a centralized way to track loading states across the app,
 * preventing prop drilling and enabling coordinated loading UX.
 * 
 * @example
 * const { isLoading, setLoading } = useLoading()
 * 
 * // Start loading
 * setLoading('timeline', true)
 * 
 * // Check if anything is loading
 * if (isLoading()) { ... }
 * 
 * // Check specific loading state
 * if (isLoading('timeline')) { ... }
 */
const LoadingContext = createContext(null)

/**
 * Loading types enumeration
 * Defines all possible loading states in the application
 */
export const LOADING_TYPES = {
  APP_INIT: 'app_init',           // Initial app load
  MAP_IMAGE: 'map_image',         // Map image loading
  TIMELINE: 'timeline',           // Timeline transition
  CHARACTER_FILTER: 'char_filter', // Character filtering
  DATA_EXPORT: 'data_export',     // Data export operation
}

/**
 * Loading provider component
 * Manages multiple concurrent loading states
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function LoadingProvider({ children }) {
  /**
   * Loading states map
   * Structure: { [loadingType]: boolean }
   */
  const [loadingStates, setLoadingStates] = useState({})

  /**
   * Sets loading state for a specific type
   * 
   * @param {string} type - Loading type from LOADING_TYPES
   * @param {boolean} isLoading - Loading state
   * 
   * @example
   * setLoading(LOADING_TYPES.TIMELINE, true)
   */
  const setLoading = useCallback((type, isLoading) => {
    setLoadingStates((prev) => ({
      ...prev,
      [type]: isLoading,
    }))
  }, [])

  /**
   * Checks if any or specific type is loading
   * 
   * @param {string} [type] - Optional specific type to check
   * @returns {boolean} True if loading
   * 
   * @example
   * isLoading() // Returns true if ANY loading is active
   * isLoading(LOADING_TYPES.TIMELINE) // Returns true if timeline is loading
   */
  const isLoading = useCallback(
    (type = null) => {
      if (type) {
        return loadingStates[type] === true
      }
      // Check if ANY loading state is active
      return Object.values(loadingStates).some((state) => state === true)
    },
    [loadingStates]
  )

  /**
   * Clears all loading states
   * Useful for error recovery or force refresh
   */
  const clearAllLoading = useCallback(() => {
    setLoadingStates({})
  }, [])

  /**
   * Wraps an async operation with loading state management
   * Automatically sets loading before and clears after operation
   * 
   * @param {string} type - Loading type
   * @param {Function} asyncFn - Async function to execute
   * @returns {Promise} Result of async function
   * 
   * @example
   * await withLoading(LOADING_TYPES.TIMELINE, async () => {
   *   await fetchTimelineData()
   * })
   */
  const withLoading = useCallback(
    async (type, asyncFn) => {
      setLoading(type, true)
      try {
        return await asyncFn()
      } finally {
        setLoading(type, false)
      }
    },
    [setLoading]
  )

  // Memoize context value
  const value = useMemo(
    () => ({
      loadingStates,
      isLoading,
      setLoading,
      clearAllLoading,
      withLoading,
    }),
    [loadingStates, isLoading, setLoading, clearAllLoading, withLoading]
  )

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Custom hook to consume loading context
 * 
 * @returns {Object} Loading state and controls
 * @throws {Error} If used outside LoadingProvider
 */
export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}