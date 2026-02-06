import { memo } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@components/shared'

/**
 * Character pin component
 * Renders a draggable marker on the map with character tooltip
 * Memoized to prevent unnecessary re-renders during drag operations
 * 
 * @component
 * 
 * @param {Object} props
 * @param {Object} props.character - Character data object
 * @param {string} props.character.id - Unique character identifier
 * @param {string} props.character.name - Character name for display
 * @param {Object} props.position - Pin position on map
 * @param {number} props.position.x - Normalized X coordinate (0-1)
 * @param {number} props.position.y - Normalized Y coordinate (0-1)
 * @param {boolean} props.isDragging - Whether this pin is currently being dragged
 * @param {boolean} props.isHovered - Whether mouse is over this pin
 * @param {Function} props.onDragStart - Called when drag begins
 * @param {Function} props.onClick - Called when pin is clicked
 * @param {Function} props.onMouseEnter - Called when mouse enters pin
 * @param {Function} props.onMouseLeave - Called when mouse leaves pin
 * 
 * @example
 * <CharacterPin
 *   character={characterData}
 *   position={{ x: 0.5, y: 0.3 }}
 *   isDragging={draggingId === characterData.id}
 *   onDragStart={() => handleDragStart(characterData.id)}
 *   onClick={() => selectCharacter(characterData)}
 * />
 */
const CharacterPin = memo(function CharacterPin({
  character,
  position,
  isDragging,
  isHovered,
  onDragStart,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  /**
   * Handles mouse down event
   * Prevents default to avoid text selection during drag
   * 
   * @param {MouseEvent} e - Mouse event
   */
  const handleMouseDown = (e) => {
    e.preventDefault() // Prevent text selection
    onDragStart(character.id)
  }

  /**
   * Handles click event
   * Only triggers if not dragging (to avoid accidental clicks)
   * 
   * @param {MouseEvent} e - Mouse event
   */
  const handleClick = (e) => {
    if (!isDragging) {
      onClick(character)
    }
  }

  return (
    <div
      className="char-pin"
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseEnter={() => onMouseEnter(character.id)}
      onMouseLeave={() => onMouseLeave(character.id)}
      role="button"
      tabIndex={0}
      aria-label={`${character.name} - Click to view details, drag to reposition`}
    >
      <Tooltip 
        text={character.name} 
        show={isHovered ? true : undefined}
      />
    </div>
  )
})

CharacterPin.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  isDragging: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool,
  onDragStart: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
}

CharacterPin.defaultProps = {
  isHovered: false,
}

export default CharacterPin