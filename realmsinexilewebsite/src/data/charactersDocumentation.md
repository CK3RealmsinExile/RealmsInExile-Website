 /**
 * Characters JSON Schema
 * 
 * @typedef {Object} Character
 * @property {string} id - Unique identifier (format: char_XXX)
 * @property {string} name - Character's display name
 * @property {string[]} description - Array of description paragraphs
 * @property {string} [image] - Optional path to character portrait
 * @property {Object} [metadata] - Optional additional character information
 * @property {string} [metadata.birth] - Birth date in Middle-earth calendar
 * @property {string} [metadata.death] - Death date (if applicable)
 * @property {string[]} [metadata.titles] - List of titles/epithets
 * @property {string[]} startDates - Timeline dates when character appears
 *                                   Must match dates from startDates.json
 * @property {Position} position - Default/fallback position on map
 * @property {Object.<string, Position>} positions - Position at each timeline
 *                                                   Keys match startDates entries
 * 
 * @typedef {Object} Position
 * @property {number} x - Normalized X coordinate (0-1 range)
 * @property {number} y - Normalized Y coordinate (0-1 range)
 */ 