import { useState, useRef, useEffect, useCallback } from 'react'
import { useAppContext } from '@context/AppContext'
import { useSearch } from '@context/SearchContext'
import './CharacterSearch.css'

/**
 * Character search component
 * Provides autocomplete search for characters with timeline filtering
 * 
 * Features:
 * - Real-time autocomplete suggestions
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Click-outside to close dropdown
 * - Highlights matching text in results
 * - Shows character count per result
 * 
 * @component
 * 
 * @example
 * <CharacterSearch />
 */
function CharacterSearch() {
  const { characters } = useAppContext()
  const {
    searchQuery,
    setSearch,
    setFilter,
    clearSearch,
    matchesSearch,
  } = useSearch()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  /**
   * Get filtered character results based on search query
   * Sorts by exact match first, then alphabetically
   */
  const searchResults = useCallback(() => {
    if (!searchQuery.trim()) return []

    return characters
      .filter(matchesSearch)
      .sort((a, b) => {
        const query = searchQuery.toLowerCase()
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()

        // Exact match first
        const aExact = aName === query
        const bExact = bName === query
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1

        // Starts with query second
        const aStarts = aName.startsWith(query)
        const bStarts = bName.startsWith(query)
        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1

        // Alphabetical
        return aName.localeCompare(bName)
      })
      .slice(0, 5) // Limit to 5 results for UX
  }, [searchQuery, characters, matchesSearch])

  const results = searchResults()

  /**
   * Handles input change
   * Opens dropdown and resets selection
   */
  const handleInputChange = (e) => {
    const value = e.target.value
    setSearch(value)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  /**
   * Handles selecting a character from results
   * 
   * @param {Object} character - Selected character
   */
  const handleSelectCharacter = (character) => {
    setFilter(character)
    setIsOpen(false)
    inputRef.current?.blur() // Remove focus after selection
  }

  /**
   * Handles clearing the search
   */
  const handleClear = () => {
    clearSearch()
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  /**
   * Handles keyboard navigation
   * Arrow up/down: Navigate results
   * Enter: Select highlighted result
   * Escape: Close dropdown
   */
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' && searchQuery.trim()) {
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        )
        break

      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break

      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectCharacter(results[selectedIndex])
        }
        break

      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSelectedIndex(-1)
        break

      default:
        break
    }
  }

  /**
   * Click outside handler to close dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**
   * Highlights matching text in result
   * 
   * @param {string} text - Text to highlight
   * @returns {JSX.Element} Text with highlighted matches
   */
  const highlightMatch = (text) => {
    if (!searchQuery.trim()) return text

    const query = searchQuery.trim()
    const index = text.toLowerCase().indexOf(query.toLowerCase())

    if (index === -1) return text

    return (
      <>
        {text.slice(0, index)}
        <mark className="search-highlight">{text.slice(index, index + query.length)}</mark>
        {text.slice(index + query.length)}
      </>
    )
  }

  return (
    <div className="character-search" ref={searchRef}>
      <div className="character-search__input-wrapper">
        {/* Search icon */}
        <svg
          className="character-search__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          className="character-search__input"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.trim() && setIsOpen(true)}
          aria-label="Search for characters"
          aria-autocomplete="list"
          aria-controls="character-search-results"
          aria-expanded={isOpen}
          aria-activedescendant={
            selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined
          }
        />

        {/* Clear button */}
        {searchQuery && (
          <button
            className="character-search__clear"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {isOpen && results.length > 0 && (
        <ul
          className="character-search__results"
          id="character-search-results"
          role="listbox"
        >
          {results.map((character, index) => (
            <li
              key={character.id}
              id={`search-result-${index}`}
              className={`character-search__result ${
                index === selectedIndex ? 'character-search__result--selected' : ''
              }`}
              onClick={() => handleSelectCharacter(character)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <div className="character-search__result-content">
                <span className="character-search__result-name">
                  {highlightMatch(character.name)}
                </span>
                <span className="character-search__result-count">
                  {character.startDates.length} timeline{character.startDates.length !== 1 ? 's' : ''}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* No results message */}
      {isOpen && searchQuery.trim() && results.length === 0 && (
        <div className="character-search__no-results">
          No characters found matching "{searchQuery}"
        </div>
      )}
    </div>
  )
}

export default CharacterSearch