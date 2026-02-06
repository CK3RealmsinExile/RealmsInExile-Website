/**
 * Data export utilities
 * Handles exporting character positions to downloadable JSON files
 * 
 * @module exportHelpers
 */

import { EXPORT } from './constants'
import { roundCoordinates } from './coordinateHelpers'

/**
 * Exports character position data to JSON file
 * Creates downloadable blob and triggers browser download
 * 
 * @param {Array<Object>} charactersData - Array of character objects with positions
 * @param {string} [filename] - Custom filename (optional)
 * @throws {Error} If charactersData is invalid
 * 
 * @example
 * exportCharacterPositions(characters, 'my_positions.json')
 */
export function exportCharacterPositions(charactersData, filename = EXPORT.FILENAME) {
  if (!Array.isArray(charactersData) || charactersData.length === 0) {
    throw new Error('Invalid character data provided for export')
  }

  try {
    // Transform data: extract only necessary fields and round coordinates
    const exportData = charactersData.map((char) => {
      const roundedPositions = {}
      
      // Round each position's coordinates to reduce file size
      Object.entries(char.positions).forEach(([date, coords]) => {
        roundedPositions[date] = roundCoordinates(coords)
      })

      return {
        id: char.id,
        name: char.name,
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

    // Cleanup: remove link and revoke object URL to free memory
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export character positions:', error)
    throw new Error('Export failed. Please try again.')
  }
}

/**
 * Validates character position data structure
 * Ensures data meets expected schema before export
 * 
 * @param {Array<Object>} data - Character data to validate
 * @returns {boolean} True if valid
 * 
 * @example
 * if (validateCharacterData(chars)) {
 *   exportCharacterPositions(chars)
 * }
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
 * Imports character positions from JSON file
 * 
 * @param {File} file - JSON file from file input
 * @returns {Promise<Array<Object>>} Parsed character data
 * @throws {Error} If file is invalid or parsing fails
 * 
 * @example
 * const fileInput = document.querySelector('input[type="file"]')
 * const data = await importCharacterPositions(fileInput.files[0])
 */
export async function importCharacterPositions(file) {
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
    console.error('Failed to import character positions:', error)
    throw new Error('Import failed. Please check your file format.')
  }
}