import PropTypes from 'prop-types'
import './Spinner.css'

/**
 * Spinner component
 * Displays an animated loading spinner with customizable size and color
 * 
 * Uses CSS animations for smooth, performant rendering
 * Includes proper ARIA attributes for accessibility
 * 
 * @component
 * 
 * @param {Object} props
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Spinner size
 * @param {string} [props.color] - Custom color (uses CSS variable by default)
 * @param {string} [props.label='Loading...'] - Accessible label for screen readers
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * <Spinner size="large" label="Loading map..." />
 */
function Spinner({ size = 'medium', color, label = 'Loading...', className = '' }) {
  const spinnerClasses = [
    'spinner',
    `spinner--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const spinnerStyle = color ? { borderTopColor: color } : {}

  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className={spinnerClasses} style={spinnerStyle} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
}

export default Spinner