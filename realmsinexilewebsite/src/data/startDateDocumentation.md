/**
 * Start Dates JSON Schema
 * 
 * @typedef {Object} StartDate
 * @property {number} id - Unique identifier (sequential)
 * @property {string} name - Timeline/era name
 * @property {string} date - Display date in Middle-earth calendar format
 *                           (S.A. = Second Age, T.A. = Third Age, Fo.A. = Fourth Age)
 * @property {string} tooltip - Short tooltip text for timeline navigation
 * @property {('major'|'minor')} type - Timeline significance level
 *                                      - 'major': Major historical turning points
 *                                      - 'minor': Significant but less pivotal events
 * @property {string} description - Main description paragraph (2-3 sentences)
 * @property {string[]} extra - Additional detail paragraphs (optional expansion content)
 */