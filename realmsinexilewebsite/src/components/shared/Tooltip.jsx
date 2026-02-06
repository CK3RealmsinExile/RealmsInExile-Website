import PropTypes from 'prop-types'
import './Tooltip.css'

/**
 * Reusable tooltip component
 * Displays contextual information on hover
 * 
 * @component
 * 
 * @param {Object} props
 * @param {string} props.text - Tooltip content
 * @param {React.ReactNode} [props.children] - Content to wrap (trigger element)
 * @param {string} [props.position='bottom'] - Tooltip position relative to trigger
 * @param {boolean} [props.show] - Force show/hide (overrides hover)
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * <Tooltip text="Click to edit" position="top">
 *   <button>Edit</button>
 * </Tooltip>
 */
function Tooltip({ 
  text, 
  children, 
  position = 'bottom', 
  show, 
  className = '' 
}) {
  const tooltipClasses = [
    'tooltip',
    `tooltip--${position}`,
    show !== undefined && (show ? 'tooltip--visible' : 'tooltip--hidden'),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="tooltip-wrapper">
      {children}
      <div 
        className={tooltipClasses}
        role="tooltip"
        aria-label={text}
      >
        {text}
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  show: PropTypes.bool,
  className: PropTypes.string,
}

export default Tooltip