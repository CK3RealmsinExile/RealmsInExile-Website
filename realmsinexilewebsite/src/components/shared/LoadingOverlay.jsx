import PropTypes from 'prop-types'
import Spinner from './Spinner'
import './LoadingOverlay.css'

/**
 * Loading overlay component
 * Displays a full-screen or positioned overlay with loading indicator
 * 
 * Used for blocking interactions during critical operations
 * Includes backdrop blur for visual focus
 * 
 * @component
 * 
 * @param {Object} props
 * @param {boolean} [props.show=false] - Whether to display the overlay
 * @param {string} [props.message] - Optional loading message to display
 * @param {('fixed'|'absolute')} [props.position='fixed'] - Overlay positioning
 * @param {boolean} [props.transparent=false] - Use transparent background
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * <LoadingOverlay show={isLoading} message="Loading timeline..." />
 */
function LoadingOverlay({
  show = false,
  message,
  position = 'fixed',
  transparent = false,
  className = '',
}) {
  if (!show) return null

  const overlayClasses = [
    'loading-overlay',
    `loading-overlay--${position}`,
    transparent && 'loading-overlay--transparent',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={overlayClasses} role="alert" aria-busy="true">
      <div className="loading-overlay__content">
        <Spinner size="large" label={message || 'Loading...'} />
        {message && (
          <p className="loading-overlay__message" aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

LoadingOverlay.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  position: PropTypes.oneOf(['fixed', 'absolute']),
  transparent: PropTypes.bool,
  className: PropTypes.string,
}

export default LoadingOverlay