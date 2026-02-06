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