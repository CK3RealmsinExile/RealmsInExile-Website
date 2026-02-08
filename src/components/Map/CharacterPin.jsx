import { memo } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@components/shared'
import { useEditMode } from '@context/EditModeContext'
import { getFactionColor, getCharacterInitials } from '@utils/constants'

/**
 * Character pin component with faction-colored marker design
 * Modern map pin with character initial and faction color
 * 
 * @component
 */
const CharacterPin = memo(function CharacterPin({
  character,
  position,
  isDragging,
  isHovered,
  isFiltered,  // ← New prop for search filter
  onDragStart,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const { isEditMode } = useEditMode()

  const handleMouseDown = (e) => {
    if (!isEditMode) return
    e.preventDefault()
    onDragStart(character.id)
  }

  const handleClick = (e) => {
    if (isEditMode || isDragging) return
    onClick(character)
  }

  // Get faction color and character initials
  const factionColor = getFactionColor(character.faction)
  const initials = getCharacterInitials(character.name)

  // Build classes for different states
  const pinClasses = [
    'char-pin',
    isDragging && 'char-pin--dragging',
    isHovered && 'char-pin--hovered',
    isFiltered && 'char-pin--filtered',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={pinClasses}
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        '--faction-color': factionColor,  // CSS variable for dynamic color
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseEnter={() => onMouseEnter(character.id)}
      onMouseLeave={() => onMouseLeave(character.id)}
      role="button"
      tabIndex={0}
      aria-label={
        isEditMode
          ? `${character.name} - Drag to reposition`
          : `${character.name} - Click to view details`
      }
    >
      {/* Pin marker with teardrop shape */}
      <div className="char-pin__marker">
        <span className="char-pin__initial">{initials}</span>
      </div>
      
      {/* Tooltip */}
      <Tooltip text={character.name} show={isHovered ? true : undefined} />
    </div>
  )
})

CharacterPin.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    faction: PropTypes.string,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  isDragging: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool,
  isFiltered: PropTypes.bool,
  onDragStart: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
}

CharacterPin.defaultProps = {
  isHovered: false,
  isFiltered: false,
}

export default CharacterPin