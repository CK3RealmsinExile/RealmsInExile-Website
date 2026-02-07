import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import startDatesData from '@data/startDates.json'
import charactersData from '@data/characters.json'
import { useUrlState } from '@hooks/useUrlState'
import { URL_PARAMS } from '@utils/constants'

/**
 * Application-wide state context
 */
const AppContext = createContext(null)

/**
 * Context provider component
 * Manages global application state with URL synchronization
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function AppProvider({ children }) {
  const { getUrlParam, setUrlParams, clearUrlParams } = useUrlState()

  // Initialize state from URL if available, otherwise use defaults
  const initialTimeline = (() => {
    const urlTimeline = getUrlParam(URL_PARAMS.TIMELINE)
    if (urlTimeline) {
      // Validate that timeline exists in data
      const found = startDatesData.find((t) => t.date === urlTimeline)
      if (found) return found
    }
    return startDatesData[0]
  })()

  const [startName, setStartName] = useState(initialTimeline.name)
  const [startDate, setStartDate] = useState(initialTimeline.date)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  
  // Deep clone to preserve all positions
  const [characters, setCharacters] = useState(() =>
    JSON.parse(JSON.stringify(charactersData))
  )

  /**
   * Effect: Initialize character from URL
   * Runs once on mount to select character if specified in URL
   */
  useEffect(() => {
    const urlCharacterId = getUrlParam(URL_PARAMS.CHARACTER)
    
    if (urlCharacterId) {
      // Find character by ID
      const character = characters.find((c) => c.id === urlCharacterId)
      
      if (character) {
        // Verify character exists at current timeline
        if (character.startDates.includes(startDate)) {
          setSelectedCharacter(character)
          setSidebarOpen(true)
        } else {
          // Character doesn't exist at this timeline, clear from URL
          clearUrlParams(URL_PARAMS.CHARACTER)
        }
      } else {
        // Invalid character ID, clear from URL
        clearUrlParams(URL_PARAMS.CHARACTER)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  /**
   * Effect: Sync timeline changes to URL
   * Updates URL when user selects a different timeline
   */
  useEffect(() => {
    setUrlParams({ [URL_PARAMS.TIMELINE]: startDate })
  }, [startDate, setUrlParams])

  /**
   * Effect: Sync character selection to URL
   * Updates URL when user selects/deselects a character
   */
  useEffect(() => {
    if (selectedCharacter) {
      setUrlParams({ [URL_PARAMS.CHARACTER]: selectedCharacter.id })
    } else {
      clearUrlParams(URL_PARAMS.CHARACTER)
    }
  }, [selectedCharacter, setUrlParams, clearUrlParams])

  /**
   * Effect: Handle browser back/forward navigation
   * Listens for popstate events and updates state accordingly
   */
  useEffect(() => {
    const handlePopState = () => {
      const urlTimeline = getUrlParam(URL_PARAMS.TIMELINE)
      const urlCharacterId = getUrlParam(URL_PARAMS.CHARACTER)

      // Update timeline if changed via browser navigation
      if (urlTimeline) {
        const timeline = startDatesData.find((t) => t.date === urlTimeline)
        if (timeline && timeline.date !== startDate) {
          setStartDate(timeline.date)
          setStartName(timeline.name)
        }
      }

      // Update character if changed via browser navigation
      if (urlCharacterId) {
        const character = characters.find((c) => c.id === urlCharacterId)
        if (character && character.id !== selectedCharacter?.id) {
          setSelectedCharacter(character)
          setSidebarOpen(true)
        }
      } else if (selectedCharacter) {
        // Character was removed from URL
        setSelectedCharacter(null)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [
    getUrlParam,
    startDate,
    selectedCharacter,
    characters,
    setStartDate,
    setStartName,
    setSelectedCharacter,
  ])

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      // Timeline state
      startName,
      setStartName,
      startDate,
      setStartDate,
      startDatesData,

      // Sidebar state
      sidebarOpen,
      setSidebarOpen,
      selectedCharacter,
      setSelectedCharacter,

      // Character data
      characters,
      setCharacters,
    }),
    [startName, startDate, sidebarOpen, selectedCharacter, characters]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Custom hook to consume app context
 * Throws error if used outside provider
 *
 * @returns {Object} Application context value
 */
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}