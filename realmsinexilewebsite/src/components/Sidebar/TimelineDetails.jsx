import PropTypes from 'prop-types'

/**
 * Timeline details component
 * Displays information about a specific historical period
 * Presentational component - receives all data via props
 * 
 * @component
 * 
 * @param {Object} props
 * @param {Object} props.timeline - Timeline data object
 * @param {string} props.timeline.name - Timeline name (e.g., "The War of the Ring")
 * @param {string} props.timeline.date - Display date (e.g., "T.A. 3000")
 * @param {string} props.timeline.description - Main description paragraph
 * @param {Array<string>} [props.timeline.extra] - Additional description paragraphs
 * @param {string} [props.timeline.type] - Timeline type (major/minor) for styling
 * 
 * @example
 * <TimelineDetails timeline={selectedTimeline} />
 */
function TimelineDetails({ timeline }) {
  if (!timeline) {
    return (
      <div className="timeline-details timeline-details--empty">
        <p className="empty-state">No timeline selected</p>
      </div>
    )
  }

  return (
    <article className="timeline-details">
      {/* Timeline header */}
      <header className="timeline-details__header">
        <h2 className="timeline-details__name">{timeline.name}</h2>
        
        {/* Timeline date badge */}
        <span 
          className={`timeline-details__date timeline-details__date--${timeline.type || 'default'}`}
          aria-label={`Date: ${timeline.date}`}
        >
          {timeline.date}
        </span>
      </header>

      {/* Main description */}
      <div className="timeline-details__content">
        <p className="timeline-details__description">
          {timeline.description}
        </p>

        {/* Additional paragraphs if available */}
        {timeline.extra && timeline.extra.length > 0 && (
          <div className="timeline-details__extra">
            {timeline.extra.map((paragraph, index) => (
              <p key={index} className="timeline-details__paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Optional type indicator */}
      {timeline.type && (
        <aside className="timeline-details__metadata">
          <span className="timeline-details__type-label">
            {timeline.type === 'major' ? 'Major Historical Event' : 'Historical Event'}
          </span>
        </aside>
      )}
    </article>
  )
}

TimelineDetails.propTypes = {
  timeline: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    extra: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.oneOf(['major', 'minor']),
  }),
}

TimelineDetails.defaultProps = {
  timeline: null,
}

export default TimelineDetails