import { useRef, useState, useCallback } from 'react'
import { useAppContext } from '@context/AppContext'
import { useCharacterDrag } from '@hooks/useCharacterDrag'
import CharacterPin from './CharacterPin'
import './Map.css'

/**
 * Map container component
 * Displays map image with draggable character pins
 * Manages character positioning and drag interactions
 * 
 * @component
 * 
 * @example
 * <MapContainer />
 */
function MapContainer() {
  const mapRef = useRef(null)
  const [hoveredCharId, setHoveredCharId] = useState(null)
  
  const {
    startDate,
    characters,
    setCharacters,
    setSelectedCharacter,
    setSidebarOpen,
  } = useAppContext()

  /**
   * Updates character position in global state
   * Called during drag operations
   * 
   * @param {string|number} charId - Character identifier
   * @param {{x: number, y: number}} newPosition - New normalized coordinates
   */
  const handlePositionChange = useCallback(
    (charId, newPosition) => {
      setCharacters((prevChars) =>
        prevChars.map((char) => {
          if (char.id === charId) {
            return {
              ...char,
              positions: {
                ...char.positions,
                [startDate]: newPosition,
              },
            }
          }
          return char
        })
      )
    },
    [startDate, setCharacters]
  )

  // Custom hook handles drag logic
  const { draggingCharId, startDrag, isDragging } = useCharacterDrag(
    mapRef.current,
    handlePositionChange
  )

  /**
   * Handles character pin click
   * Opens sidebar with character details
   * 
   * @param {Object} character - Character data object
   */
  const handleCharacterClick = useCallback(
    (character) => {
      setSelectedCharacter(character)
      setSidebarOpen(true)
    },
    [setSelectedCharacter, setSidebarOpen]
  )

  /**
   * Filters characters visible at current timeline date
   * Only shows characters that exist at the selected date
   */
  const visibleCharacters = characters.filter((char) =>
    char.startDates.includes(startDate)
  )

  return (
    <div className="map-container" ref={mapRef}>
      {/* Map image - use public asset path */}
      <img 
        src="/assets/map.webp" 
        alt="Realms in Exile Map" 
        draggable={false}
      />

      {/* Character pins overlay */}
      {visibleCharacters.map((char) => {
        // Get position for current timeline, fallback to default
        const position = char.positions[startDate] || char.position

        return (
          <CharacterPin
            key={char.id}
            character={char}
            position={position}
            isDragging={isDragging(char.id)}
            isHovered={hoveredCharId === char.id}
            onDragStart={startDrag}
            onClick={handleCharacterClick}
            onMouseEnter={setHoveredCharId}
            onMouseLeave={() => setHoveredCharId(null)}
          />
        )
      })}
    </div>
  )
}

export default MapContainer