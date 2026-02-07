import { memo } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@components/shared'

const TimelineItem = memo(function TimelineItem({
  startDate,
  isActive,
  onClick,
  disabled = false,
}) {
  const handleKeyDown = (e) => {
    if (disabled) return
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  const handleClick = () => {
    if (disabled) return
    onClick()
  }

  return (
    <div className="timeline-item">
      <div
        className={`circle ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Select ${startDate.name} - ${startDate.date}`}
        aria-pressed={isActive}
        aria-disabled={disabled}
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
  disabled: PropTypes.bool,
}

export default TimelineItem