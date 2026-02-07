import { useRef, useState, useCallback } from 'react'
import { useAppContext } from '@context/AppContext'
import { useCharacterDrag } from '@hooks/useCharacterDrag'
import { useLoading, LOADING_TYPES } from '@context/LoadingContext'  // ← Add
import CharacterPin from './CharacterPin'
import { Spinner } from '@components/shared'  // ← Add
import './Map.css'

/**
 * Map container component
 * Displays map image with draggable character pins
 * Includes loading state for map image
 * 
 * @component
 */
function MapContainer() {
  const mapImageRef = useRef(null)
  const [hoveredCharId, setHoveredCharId] = useState(null)
  const { isLoading, setLoading } = useLoading()  // ← Add
  
  const {
    startDate,
    characters,
    setCharacters,
    setSelectedCharacter,
    setSidebarOpen,
  } = useAppContext()

  /**
   * Handles map image load completion
   * Clears loading state when image is fully loaded
   */
  const handleImageLoad = useCallback(() => {
    setLoading(LOADING_TYPES.MAP_IMAGE, false)
  }, [setLoading])

  /**
   * Handles map image load start
   * Sets loading state when image begins loading
   */
  const handleImageLoadStart = useCallback(() => {
    setLoading(LOADING_TYPES.MAP_IMAGE, true)
  }, [setLoading])

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

  const { draggingCharId, startDrag, isDragging } = useCharacterDrag(
    mapImageRef.current,
    handlePositionChange
  )

  const handleCharacterClick = useCallback(
    (character) => {
      setSelectedCharacter(character)
      setSidebarOpen(true)
    },
    [setSelectedCharacter, setSidebarOpen]
  )

  const visibleCharacters = characters.filter((char) =>
    char.startDates.includes(startDate)
  )

  const isMapLoading = isLoading(LOADING_TYPES.MAP_IMAGE)

  return (
    <div className="map-container">
      {/* Loading skeleton - shows while map loads */}
      {isMapLoading && (
        <div className="map-skeleton" aria-label="Loading map">
          <Spinner size="large" label="Loading map..." />
        </div>
      )}

      {/* Map wrapper - hidden until loaded to prevent layout shift */}
      <div 
        className={`map-wrapper ${isMapLoading ? 'map-wrapper--loading' : ''}`}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <img
          ref={mapImageRef}
          src="/assets/map.webp"
          alt="Realms in Exile Map"
          draggable={false}
          onLoadStart={handleImageLoadStart}  // ← Add
          onLoad={handleImageLoad}             // ← Add
          onError={() => {                     // ← Add error handling
            setLoading(LOADING_TYPES.MAP_IMAGE, false)
            console.error('Failed to load map image')
          }}
        />

        {/* Character pins positioned relative to image */}
        {visibleCharacters.map((char) => {
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
    </div>
  )
}

export default MapContainer