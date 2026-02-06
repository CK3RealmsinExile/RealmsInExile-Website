import { memo } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@components/shared'

/**
 * Individual timeline item representing a historical date
 * Displays as a circle with hover tooltip
 * Memoized to prevent unnecessary re-renders
 * 
 * @component
 * 
 * @param {Object} props
 * @param {Object} props.startDate - Timeline date object
 * @param {number} props.startDate.id - Unique identifier
 * @param {string} props.startDate.name - Timeline name
 * @param {string} props.startDate.date - Display date (e.g., "T.A. 3000")
 * @param {string} props.startDate.tooltip - Tooltip text
 * @param {boolean} props.isActive - Whether this timeline is currently selected
 * @param {Function} props.onClick - Handler when timeline is selected
 * 
 * @example
 * <TimelineItem
 *   startDate={timelineData}
 *   isActive={currentDate === timelineData.date}
 *   onClick={() => handleSelect(timelineData)}
 * />
 */
const TimelineItem = memo(function TimelineItem({
  startDate,
  isActive,
  onClick,
}) {
  /**
   * Handles both click and keyboard activation (Enter/Space)
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div className="timeline-item">
      <div
        className={`circle ${isActive ? 'active' : ''}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Select ${startDate.name} - ${startDate.date}`}
        aria-pressed={isActive}
      >
        <Tooltip text={startDate.tooltip} position="bottom" />
      </div>
      <span className="date-label">{startDate.date}</span>
    </div>
  )
})

TimelineItem.propTypes = {
  startDate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TimelineItem