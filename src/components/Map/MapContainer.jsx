import { useRef, useState, useCallback } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useAppContext } from '@context/AppContext'
import { useCharacterDrag } from '@hooks/useCharacterDrag'
import { useLoading, LOADING_TYPES } from '@context/LoadingContext'
import { useSearch } from '@context/SearchContext'
import { useEditMode } from '@context/EditModeContext'
import CharacterPin from './CharacterPin'
import { Spinner } from '@components/shared'
import './Map.css'

/**
 * Map container component
 * Displays map image with draggable character pins
 * Includes pinch-to-zoom and pan functionality
 * 
 * @component
 */
function MapContainer() {
  const mapImageRef = useRef(null)
  const [hoveredCharId, setHoveredCharId] = useState(null)
  const { isLoading, setLoading } = useLoading()
  const { isEditMode } = useEditMode()
  
  const {
    startDate,
    characters,
    setCharacters,
    setSelectedCharacter,
    setSidebarOpen,
  } = useAppContext()
  
  const { filteredCharacter, isFiltering } = useSearch()

  const handleImageLoad = useCallback(() => {
    setLoading(LOADING_TYPES.MAP_IMAGE, false)
  }, [setLoading])

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

  const visibleCharacters = characters.filter((char) => {
    if (!char.startDates.includes(startDate)) return false
    if (isFiltering()) {
      return char.id === filteredCharacter.id
    }
    return true
  })

  const isMapLoading = isLoading(LOADING_TYPES.MAP_IMAGE)

  return (
    <div className="map-container">
      {isMapLoading && (
        <div className="map-skeleton" aria-label="Loading map">
          <Spinner size="large" label="Loading map..." />
        </div>
      )}

      {/* ← Wrap map with zoom/pan functionality */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{
          step: 0.1,
        }}
        pinch={{
          step: 5,
        }}
        doubleClick={{
          disabled: false,
          mode: 'zoomIn',
        }}
        // Disable panning when in edit mode (to allow dragging pins)
        panning={{
          disabled: isEditMode,
        }}
      >
        <TransformComponent
          wrapperClass={`map-wrapper ${isMapLoading ? 'map-wrapper--loading' : ''}`}
          contentClass="map-content"
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              ref={mapImageRef}
              src="/assets/map.webp"
              alt="Realms in Exile Map"
              draggable={false}
              onLoadStart={handleImageLoadStart}
              onLoad={handleImageLoad}
              onError={() => {
                setLoading(LOADING_TYPES.MAP_IMAGE, false)
                console.error('Failed to load map image')
              }}
            />

            {!isMapLoading &&
              visibleCharacters.map((char) => {
                const position = char.positions[startDate] || char.position
                const isFilteredChar = isFiltering() && char.id === filteredCharacter.id

                return (
                  <CharacterPin
                    key={char.id}
                    character={char}
                    position={position}
                    isDragging={isDragging(char.id)}
                    isHovered={hoveredCharId === char.id}
                    isFiltered={isFilteredChar}
                    onDragStart={startDrag}
                    onClick={handleCharacterClick}
                    onMouseEnter={setHoveredCharId}
                    onMouseLeave={() => setHoveredCharId(null)}
                  />
                )
              })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default MapContainer