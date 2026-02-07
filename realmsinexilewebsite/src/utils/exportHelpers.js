/**
 * Data export utilities
 * Handles exporting character data with updated positions
 * 
 * @module exportHelpers
 */

import { EXPORT } from './constants'
import { roundCoordinates } from './coordinateHelpers'

/**
 * Exports complete character data to JSON file
 * Maintains full character structure with updated positions
 * 
 * @param {Array<Object>} charactersData - Array of character objects with positions
 * @param {string} [filename] - Custom filename (optional)
 * @throws {Error} If charactersData is invalid
 * 
 * @example
 * exportCharacterData(characters, 'characters.json')
 */
export function exportCharacterData(charactersData, filename = 'characters.json') {
  if (!Array.isArray(charactersData) || charactersData.length === 0) {
    throw new Error('Invalid character data provided for export')
  }

  try {
    // Export COMPLETE character data with rounded positions
    const exportData = charactersData.map((char) => {
      const roundedPositions = {}
      
      // Round each position's coordinates to reduce file size
      Object.entries(char.positions).forEach(([date, coords]) => {
        roundedPositions[date] = roundCoordinates(coords)
      })

      // Round the default position too
      const roundedDefaultPosition = roundCoordinates(char.position)

      // Return complete character object with ALL fields
      return {
        id: char.id,
        name: char.name,
        faction: char.faction || 'neutral',
        description: char.description,
        ...(char.image && { image: char.image }),
        ...(char.metadata && { metadata: char.metadata }),
        startDates: char.startDates,
        position: roundedDefaultPosition,
        positions: roundedPositions,
      }
    })

    // Create JSON blob
    const jsonString = JSON.stringify(exportData, null, EXPORT.INDENT)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    // Trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export character data:', error)
    throw new Error('Export failed. Please try again.')
  }
}

/**
 * Legacy function for backward compatibility
 * Exports only positions (minimal format)
 */
export function exportCharacterPositions(charactersData, filename = EXPORT.FILENAME) {
  if (!Array.isArray(charactersData) || charactersData.length === 0) {
    throw new Error('Invalid character data provided for export')
  }

  try {
    // Transform data: extract only necessary fields and round coordinates
    const exportData = charactersData.map((char) => {
      const roundedPositions = {}
      
      Object.entries(char.positions).forEach(([date, coords]) => {
        roundedPositions[date] = roundCoordinates(coords)
      })

      return {
        id: char.id,
        name: char.name,
        positions: roundedPositions,
      }
    })

    const jsonString = JSON.stringify(exportData, null, EXPORT.INDENT)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export character positions:', error)
    throw new Error('Export failed. Please try again.')
  }
}

/**
 * Validates character data structure
 * Ensures data meets expected schema before export
 * 
 * @param {Array<Object>} data - Character data to validate
 * @returns {boolean} True if valid
 */
export function validateCharacterData(data) {
  if (!Array.isArray(data)) return false

  return data.every(
    (char) =>
      char.id &&
      char.name &&
      char.positions &&
      typeof char.positions === 'object'
  )
}

/**
 * Imports character data from JSON file
 * 
 * @param {File} file - JSON file from file input
 * @returns {Promise<Array<Object>>} Parsed character data
 * @throws {Error} If file is invalid or parsing fails
 */
export async function importCharacterData(file) {
  if (!file || file.type !== 'application/json') {
    throw new Error('Please select a valid JSON file')
  }

  try {
    const text = await file.text()
    const data = JSON.parse(text)

    if (!validateCharacterData(data)) {
      throw new Error('Invalid character data structure')
    }

    return data
  } catch (error) {
    console.error('Failed to import character data:', error)
    throw new Error('Import failed. Please check your file format.')
  }
}