import { useRef, useState, useCallback } from 'react'
import { useAppContext } from '@context/AppContext'
import { useCharacterDrag } from '@hooks/useCharacterDrag'
import CharacterPin from './CharacterPin'
import './Map.css'

function MapContainer() {
  const mapImageRef = useRef(null)
  const [hoveredCharId, setHoveredCharId] = useState(null)
  
  const {
    startDate,
    characters,
    setCharacters,
    setSelectedCharacter,
    setSidebarOpen,
  } = useAppContext()

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

  // Pass the IMAGE ref, not the container ref
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

  return (
    <div className="map-container">
      {/* Wrapper for positioning context */}
      <div className="map-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
        <img 
          ref={mapImageRef}  // ← Ref on the image
          src="/assets/map.webp" 
          alt="Realms in Exile Map" 
          draggable={false}
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