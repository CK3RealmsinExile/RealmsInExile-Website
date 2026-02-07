/**
 * Application-wide constants and configuration values
 * Centralizes magic numbers to improve maintainability
 * 
 * @module constants
 */

/**
 * Z-index layers for proper stacking context
 * Lower values appear behind higher values
 */
export const Z_INDEX = {
  MAP_BASE: 1000,
  CHARACTER_PIN: 1100,
  CHARACTER_TOOLTIP: 1150,
  SIDEBAR_TOGGLE: 1500,
  SIDEBAR: 2000,
  SIDEBAR_CLOSE: 2100,
  TIMELINE_NAV: 3000,
}

/**
 * Breakpoints for responsive design (in pixels)
 * Matches common device widths
 */
export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440,
}

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION = {
  SIDEBAR_TRANSITION: 300,
  TOOLTIP_FADE: 200,
  PIN_SCALE: 200,
}

/**
 * Character pin styling values
 */
export const PIN = {
  BASE_SIZE: 1, // px (actual visual is border)
  BORDER_WIDTH: 4, // px
  HOVER_SCALE: 1.5,
  GLOW_RADIUS: 40, // px
}

/**
 * Timeline navigation dimensions
 */
export const TIMELINE = {
  HEIGHT: 89, // px
  BORDER_WIDTH: 4, // px
  CIRCLE_SIZE: 24, // px
  CIRCLE_BORDER: 2, // px
  LINE_HEIGHT: 4, // px
}

/**
 * Sidebar dimensions
 */
export const SIDEBAR = {
  WIDTH: 350, // px
  PADDING: 20, // px
  HIDDEN_OFFSET: -390, // px (width + padding + shadow)
}

/**
 * Color palette
 */
export const COLORS = {
  GOLD: '#b8860b',
  GOLD_RGB: '184, 134, 11',
  GREY_BG: 'grey',
  TOOLTIP_BG: '#333',
  WHITE: '#fff',
  RED: 'red',
}

/**
 * File export settings
 */
export const EXPORT = {
  FILENAME: 'characters_positions.json',
  INDENT: 2, // JSON.stringify spacing
}

/**
 * URL query parameter names
 * Centralized to prevent typos and enable easy refactoring
 */
export const URL_PARAMS = {
  TIMELINE: 'timeline',      // Timeline date parameter (e.g., "T.A. 3018")
  CHARACTER: 'character',    // Character ID parameter (e.g., "char_001")
}

/**
 * URL state configuration
 */
export const URL_CONFIG = {
  // Use replaceState (don't add to history) for programmatic updates
  // Use pushState (add to history) for user-initiated navigation
  USE_HISTORY: true,
  
  // Debounce delay for URL updates (ms)
  // Prevents excessive history entries during rapid state changes
  DEBOUNCE_DELAY: 300,
}

/**
 * Faction/Character colors
 * Used for color-coding character pins by allegiance
 */
export const FACTION_COLORS = {
  gondor: '#4A90E2',      // Blue - Gondor
  rohan: '#7CB342',       // Green - Rohan
  wizards: '#9C27B0',     // Purple - Wizards
  elves: '#26A69A',       // Teal - Elves
  dwarves: '#FF6F00',     // Orange - Dwarves
  dunedain: '#5D4037',    // Brown - Rangers
  evil: '#D32F2F',        // Red - Enemies
  neutral: '#B8860B',     // Gold - Neutral/Default
}

/**
 * Get faction color with fallback
 * 
 * @param {string} faction - Faction identifier
 * @returns {string} Hex color code
 */
export function getFactionColor(faction) {
  return FACTION_COLORS[faction] || FACTION_COLORS.neutral
}

/**
 * Get character initials for pin display
 * Takes first letter of first word and first letter of last word
 * 
 * @param {string} name - Character name
 * @returns {string} Initials (1-2 characters)
 * 
 * @example
 * getCharacterInitials("Aragorn") // "A"
 * getCharacterInitials("Gandalf the Grey") // "GG"
 * getCharacterInitials("Théoden King") // "TK"
 */
export function getCharacterInitials(name) {
  const words = name.split(' ').filter(word => 
    !['the', 'of', 'and'].includes(word.toLowerCase())
  )
  
  if (words.length === 1) {
    return words[0][0].toUpperCase()
  }
  
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}