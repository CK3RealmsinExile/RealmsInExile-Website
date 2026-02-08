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

      // FIX: Use getBoundingClientRect() fresh on each move
      // to account for any scrolling that may have occurred
      const rect = mapRef.getBoundingClientRect()
      const coords = normalizeCoordinates(e, rect)
      
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
      
      // FIX: Prevent scroll during drag
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scrolling when drag ends
      document.body.style.overflow = ''
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.style.overflow = ''
    }
  }, [draggingCharId, handleMouseMove, handleMouseUp])

  return {
    draggingCharId,
    startDrag: setDraggingCharId,
    isDragging: (id) => draggingCharId === id,
  }
}