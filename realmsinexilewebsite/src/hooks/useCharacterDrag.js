import { useState, useEffect, useCallback } from 'react'
import { normalizeCoordinates } from '@utils/coordinateHelpers'

/**
 * Custom hook for character pin drag functionality
 * 
 * @param {HTMLElement|null} mapRef - Reference to map container element
 * @param {Function} onPositionChange - Callback when position updates
 * @returns {Object} Drag state and handlers
 */
export function useCharacterDrag(mapRef, onPositionChange) {
  const [draggingCharId, setDraggingCharId] = useState(null)

  const handleMouseMove = useCallback(
    (e) => {
      if (!draggingCharId || !mapRef) return

      const coords = normalizeCoordinates(e, mapRef.getBoundingClientRect())
      onPositionChange(draggingCharId, coords)
    },
    [draggingCharId, mapRef, onPositionChange]
  )

  const handleMouseUp = useCallback(() => {
    setDraggingCharId(null)
  }, [])

  useEffect(() => {
    if (draggingCharId) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggingCharId, handleMouseMove, handleMouseUp])

  return {
    draggingCharId,
    startDrag: setDraggingCharId,
    isDragging: (id) => draggingCharId === id,
  }
}