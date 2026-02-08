import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

/**
 * Search/Filter context
 * Manages character search and filtering state
 * 
 * Provides centralized search state that affects:
 * - Timeline highlighting (shows which dates have the character)
 * - Character visibility (shows only filtered character)
 * - UI components (search input, clear button)
 */
const SearchContext = createContext(null)

/**
 * Search provider component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function SearchProvider({ children }) {
  /**
   * Current search query string
   */
  const [searchQuery, setSearchQuery] = useState('')
  
  /**
   * Currently filtered character (if any)
   */
  const [filteredCharacter, setFilteredCharacter] = useState(null)

  /**
   * Sets the search query
   * 
   * @param {string} query - Search string
   */
  const setSearch = useCallback((query) => {
    setSearchQuery(query)
  }, [])

  /**
   * Sets the filtered character
   * When a character is selected from search results
   * 
   * @param {Object|null} character - Character object or null to clear
   */
  const setFilter = useCallback((character) => {
    setFilteredCharacter(character)
    // Keep search query visible when character is selected
    if (character) {
      setSearchQuery(character.name)
    }
  }, [])

  /**
   * Clears search and filter
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setFilteredCharacter(null)
  }, [])

  /**
   * Checks if a character matches the current search query
   * Case-insensitive partial match
   * 
   * @param {Object} character - Character object
   * @returns {boolean} True if character matches search
   */
  const matchesSearch = useCallback(
    (character) => {
      if (!searchQuery.trim()) return true
      
      const query = searchQuery.toLowerCase().trim()
      const name = character.name.toLowerCase()
      
      return name.includes(query)
    },
    [searchQuery]
  )

  /**
   * Checks if currently filtering (has a selected character)
   * 
   * @returns {boolean} True if filtering
   */
  const isFiltering = useCallback(() => {
    return filteredCharacter !== null
  }, [filteredCharacter])

  /**
   * Gets timeline dates where filtered character appears
   * 
   * @returns {string[]} Array of timeline dates
   */
  const getFilteredDates = useCallback(() => {
    if (!filteredCharacter) return []
    return filteredCharacter.startDates || []
  }, [filteredCharacter])

  const value = useMemo(
    () => ({
      searchQuery,
      filteredCharacter,
      setSearch,
      setFilter,
      clearSearch,
      matchesSearch,
      isFiltering,
      getFilteredDates,
    }),
    [
      searchQuery,
      filteredCharacter,
      setSearch,
      setFilter,
      clearSearch,
      matchesSearch,
      isFiltering,
      getFilteredDates,
    ]
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Custom hook to consume search context
 * 
 * @returns {Object} Search state and controls
 */
export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}