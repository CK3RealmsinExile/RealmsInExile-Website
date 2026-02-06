/**
 * Coordinate transformation utilities
 * Handles conversion between screen pixels and normalized map coordinates
 * 
 * @module coordinateHelpers
 */

/**
 * Normalizes mouse coordinates to 0-1 range based on container bounds
 * Clamps values to prevent pins from going outside the map
 * 
 * @param {MouseEvent} event - Mouse event containing clientX/clientY
 * @param {DOMRect} containerRect - Bounding rectangle of map container
 * @returns {{x: number, y: number}} Normalized coordinates (0-1 range)
 * 
 * @example
 * const coords = normalizeCoordinates(mouseEvent, mapElement.getBoundingClientRect())
 * // Returns: { x: 0.5, y: 0.3 } for center-left position
 */
export function normalizeCoordinates(event, containerRect) {
  let x = (event.clientX - containerRect.left) / containerRect.width
  let y = (event.clientY - containerRect.top) / containerRect.height

  // Clamp to valid range to prevent pins from escaping map bounds
  x = Math.max(0, Math.min(1, x))
  y = Math.max(0, Math.min(1, y))

  return { x, y }
}

/**
 * Converts normalized coordinates (0-1) to pixel values
 * 
 * @param {{x: number, y: number}} normalizedCoords - Coordinates in 0-1 range
 * @param {DOMRect} containerRect - Bounding rectangle of map container
 * @returns {{x: number, y: number}} Pixel coordinates
 * 
 * @example
 * const pixels = denormalizeCoordinates({ x: 0.5, y: 0.5 }, rect)
 * // Returns: { x: 400, y: 300 } for 800x600 container
 */
export function denormalizeCoordinates(normalizedCoords, containerRect) {
  return {
    x: normalizedCoords.x * containerRect.width,
    y: normalizedCoords.y * containerRect.height,
  }
}

/**
 * Calculates distance between two normalized coordinate points
 * Uses Euclidean distance formula
 * 
 * @param {{x: number, y: number}} coord1 - First coordinate
 * @param {{x: number, y: number}} coord2 - Second coordinate
 * @returns {number} Distance (0-1 range, diagonal = ~1.414)
 * 
 * @example
 * const dist = calculateDistance({ x: 0, y: 0 }, { x: 1, y: 1 })
 * // Returns: 1.414... (diagonal distance)
 */
export function calculateDistance(coord1, coord2) {
  const dx = coord2.x - coord1.x
  const dy = coord2.y - coord1.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Checks if two character pins would overlap visually
 * 
 * @param {{x: number, y: number}} coord1 - First pin position
 * @param {{x: number, y: number}} coord2 - Second pin position
 * @param {number} threshold - Minimum distance before overlap (default: 0.02)
 * @returns {boolean} True if pins overlap
 * 
 * @example
 * if (arePinsOverlapping(pos1, pos2, 0.03)) {
 *   console.warn('Pins too close together')
 * }
 */
export function arePinsOverlapping(coord1, coord2, threshold = 0.02) {
  return calculateDistance(coord1, coord2) < threshold
}

/**
 * Rounds coordinate values to specified decimal places
 * Useful for reducing JSON file size when exporting
 * 
 * @param {{x: number, y: number}} coords - Coordinates to round
 * @param {number} decimals - Number of decimal places (default: 4)
 * @returns {{x: number, y: number}} Rounded coordinates
 * 
 * @example
 * roundCoordinates({ x: 0.123456, y: 0.789012 }, 3)
 * // Returns: { x: 0.123, y: 0.789 }
 */
export function roundCoordinates(coords, decimals = 4) {
  const factor = Math.pow(10, decimals)
  return {
    x: Math.round(coords.x * factor) / factor,
    y: Math.round(coords.y * factor) / factor,
  }
}