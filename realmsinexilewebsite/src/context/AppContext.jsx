import { createContext, useContext, useState, useMemo } from 'react'
import startDatesData from '@data/startDates.json'
import charactersData from '@data/characters.json'

/**
 * Application-wide state context
 */
const AppContext = createContext(null)

/**
 * Context provider component
 * Manages global application state
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function AppProvider({ children }) {
  const [startName, setStartName] = useState(startDatesData[0].name)
  const [startDate, setStartDate] = useState(startDatesData[0].date)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [characters, setCharacters] = useState(charactersData)

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