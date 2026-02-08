import { useState } from 'react'
import PropTypes from 'prop-types'
import { useEditMode } from '@context/EditModeContext'
import './FloatingControls.css'

/**
 * Floating Action Button (FAB) menu
 * Mobile-friendly controls for edit mode and other actions
 * Expands to show multiple actions
 * 
 * Standard pattern used in Material Design and iOS
 * 
 * @component
 * 
 * @example
 * <FloatingControls />
 */
function FloatingControls() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { isEditMode, toggleEditMode } = useEditMode()

  /**
   * Toggles FAB menu expansion
   */
  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  /**
   * Handles edit mode toggle and closes menu
   */
  const handleEditModeToggle = () => {
    toggleEditMode()
    setIsExpanded(false)
  }

  return (
    <div className="floating-controls">
      {/* Backdrop - closes menu when clicked */}
      {isExpanded && (
        <div
          className="floating-controls__backdrop"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* Secondary action buttons (shown when expanded) */}
      <div className={`floating-controls__actions ${isExpanded ? 'floating-controls__actions--expanded' : ''}`}>
        {/* Edit Mode Toggle */}
        <button
          className="floating-controls__action"
          onClick={handleEditModeToggle}
          aria-label={isEditMode ? 'Disable edit mode' : 'Enable edit mode'}
          title={isEditMode ? 'View Mode' : 'Edit Mode'}
        >
          <span className="floating-controls__action-icon">
            {isEditMode ? '🔓' : '🔒'}
          </span>
          <span className="floating-controls__action-label">
            {isEditMode ? 'View' : 'Edit'}
          </span>
        </button>

        {/* Add more actions here as needed */}
        {/* Example: Help button */}
        {/* <button
          className="floating-controls__action"
          onClick={() => console.log('Show help')}
          aria-label="Show help"
        >
          <span className="floating-controls__action-icon">❓</span>
          <span className="floating-controls__action-label">Help</span>
        </button> */}
      </div>

      {/* Primary FAB button */}
      <button
        className={`floating-controls__main ${isExpanded ? 'floating-controls__main--expanded' : ''}`}
        onClick={handleToggle}
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
        aria-expanded={isExpanded}
      >
        {/* Icon rotates when expanded */}
        <svg
          className="floating-controls__main-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isExpanded ? (
            /* X icon when expanded */
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            /* Menu icon when collapsed */
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}

FloatingControls.propTypes = {}

export default FloatingControls