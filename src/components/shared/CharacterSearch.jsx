import { useState, useRef, useEffect, useCallback } from 'react'
import { useAppContext } from '@context/AppContext'
import { useSearch } from '@context/SearchContext'
import './CharacterSearch.css'

/**
 * Character search component
 * Provides autocomplete search for characters with timeline filtering
 * 
 * @component
 */
function CharacterSearch() {
  const { characters } = useAppContext()
  const {
    searchQuery,
    filteredCharacter,
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
   */
  const searchResults = useCallback(() => {
    if (!searchQuery.trim()) return []

    return characters
      .filter(matchesSearch)
      .sort((a, b) => {
        const query = searchQuery.toLowerCase()
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()

        const aExact = aName === query
        const bExact = bName === query
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1

        const aStarts = aName.startsWith(query)
        const bStarts = bName.startsWith(query)
        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1

        return aName.localeCompare(bName)
      })
      .slice(0, 5)
  }, [searchQuery, characters, matchesSearch])

  const results = searchResults()

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearch(value)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  const handleSelectCharacter = (character) => {
    setFilter(character)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    clearSearch()
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const searchClasses = [
    'character-search',
    filteredCharacter && 'character-search--active',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={searchClasses} ref={searchRef}>
      <div className="character-search__input-wrapper">
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

        {filteredCharacter && (
          <span className="character-search__badge" aria-label="Currently filtering">
            Active
          </span>
        )}
      </div>

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

      {isOpen && searchQuery.trim() && results.length === 0 && (
        <div className="character-search__no-results">
          No characters found matching "{searchQuery}"
        </div>
      )}
    </div>
  )
}

export default CharacterSearch