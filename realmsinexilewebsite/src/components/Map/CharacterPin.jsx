import { memo } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@components/shared'
import { useEditMode } from '@context/EditModeContext'  // ← Add this

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
  const { isEditMode } = useEditMode()  // ← Add this

  const handleMouseDown = (e) => {
    // Only allow dragging in edit mode
    if (!isEditMode) return  // ← Add this check
    
    e.preventDefault()
    onDragStart(character.id)
  }

  const handleClick = (e) => {
    // Only allow clicking in view mode (not while dragging)
    if (isEditMode || isDragging) return  // ← Modified check
    
    onClick(character)
  }

  return (
    <div
      className="char-pin"
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
        cursor: isEditMode 
          ? (isDragging ? 'grabbing' : 'grab')  // ← Edit mode: drag cursor
          : 'pointer',  // ← View mode: pointer cursor
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