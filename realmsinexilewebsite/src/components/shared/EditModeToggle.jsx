import { useEditMode } from '@context/EditModeContext'
import './EditModeToggle.css'

/**
 * Edit mode toggle button
 * Allows switching between view and edit modes
 * 
 * @component
 */
function EditModeToggle() {
  const { isEditMode, toggleEditMode } = useEditMode()

  return (
    <div className="edit-mode-toggle">
      <button
        className={`edit-mode-toggle__button ${isEditMode ? 'edit-mode-toggle__button--active' : ''}`}
        onClick={toggleEditMode}
        aria-label={isEditMode ? 'Switch to view mode' : 'Switch to edit mode'}
        title={`${isEditMode ? 'View' : 'Edit'} Mode (Press E)`}
      >
        <span className="edit-mode-toggle__icon">
          {isEditMode ? '🔓' : '🔒'}
        </span>
        <span className="edit-mode-toggle__text">
          {isEditMode ? 'Edit Mode' : 'View Mode'}
        </span>
      </button>
      
      {isEditMode && (
        <div className="edit-mode-indicator" aria-live="polite">
          <span className="edit-mode-indicator__dot"></span>
          <span className="edit-mode-indicator__text">
            Editing enabled - Drag pins to reposition
          </span>
        </div>
      )}
    </div>
  )
}

export default EditModeToggle