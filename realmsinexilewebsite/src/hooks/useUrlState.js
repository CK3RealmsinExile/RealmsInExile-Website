import { useEffect, useRef, useCallback } from 'react'
import { URL_PARAMS, URL_CONFIG } from '@utils/constants'

/**
 * Custom hook for URL state management
 * Provides utilities for reading and writing application state to URL
 * 
 * This hook uses the Web History API and URLSearchParams for standards-compliant
 * URL manipulation without page reloads.
 * 
 * @returns {Object} URL state utilities
 * 
 * @example
 * const { getUrlParam, setUrlParams, clearUrlParams } = useUrlState()
 * 
 * // Read from URL
 * const timeline = getUrlParam(URL_PARAMS.TIMELINE)
 * 
 * // Write to URL
 * setUrlParams({ [URL_PARAMS.TIMELINE]: 'T.A. 3018' })
 */
export function useUrlState() {
  // Debounce timer reference to prevent excessive history entries
  const debounceTimer = useRef(null)

  /**
   * Gets a single parameter from the current URL
   * 
   * @param {string} paramName - Parameter name to retrieve
   * @returns {string|null} Parameter value or null if not present
   * 
   * @example
   * const timeline = getUrlParam('timeline') // Returns "T.A. 3018" or null
   */
  const getUrlParam = useCallback((paramName) => {
    const params = new URLSearchParams(window.location.search)
    return params.get(paramName)
  }, [])

  /**
   * Gets all URL parameters as an object
   * 
   * @returns {Object} Object with all current URL parameters
   * 
   * @example
   * const params = getAllUrlParams()
   * // Returns: { timeline: "T.A. 3018", character: "char_001" }
   */
  const getAllUrlParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    const result = {}
    
    for (const [key, value] of params.entries()) {
      result[key] = value
    }
    
    return result
  }, [])

  /**
   * Updates URL parameters without page reload
   * Uses debouncing to prevent excessive history entries
   * 
   * @param {Object} newParams - Object with parameters to set
   * @param {boolean} [replace=false] - Use replaceState instead of pushState
   * 
   * @example
   * // Add to history (user can go back)
   * setUrlParams({ timeline: 'T.A. 3018' })
   * 
   * // Replace current history entry (no back button navigation)
   * setUrlParams({ timeline: 'T.A. 3018' }, true)
   */
  const setUrlParams = useCallback((newParams, replace = false) => {
    // Clear existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Debounce URL updates to prevent history pollution
    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search)

      // Update parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          params.delete(key) // Remove if empty
        } else {
          params.set(key, value)
        }
      })

      // Build new URL
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname

      // Update browser history without reload
      if (URL_CONFIG.USE_HISTORY && !replace) {
        window.history.pushState({}, '', newUrl)
      } else {
        window.history.replaceState({}, '', newUrl)
      }
    }, URL_CONFIG.DEBOUNCE_DELAY)
  }, [])

  /**
   * Removes specific parameters from URL
   * 
   * @param {string|string[]} paramNames - Parameter name(s) to remove
   * 
   * @example
   * clearUrlParams('character') // Remove character param
   * clearUrlParams(['timeline', 'character']) // Remove multiple params
   */
  const clearUrlParams = useCallback((paramNames) => {
    const params = new URLSearchParams(window.location.search)
    const names = Array.isArray(paramNames) ? paramNames : [paramNames]

    names.forEach((name) => params.delete(name))

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname

    window.history.replaceState({}, '', newUrl)
  }, [])

  /**
   * Clears all URL parameters
   * 
   * @example
   * clearAllUrlParams() // URL becomes just the pathname
   */
  const clearAllUrlParams = useCallback(() => {
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  /**
   * Cleanup: Clear debounce timer on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return {
    getUrlParam,
    getAllUrlParams,
    setUrlParams,
    clearUrlParams,
    clearAllUrlParams,
  }
}