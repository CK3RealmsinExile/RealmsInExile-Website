import { useAppContext } from '@context/AppContext'
import { exportCharacterPositions } from '@utils/exportHelpers'
import { Button } from '@components/shared'
import CharacterDetails from './CharacterDetails'
import TimelineDetails from './TimelineDetails'
import './Sidebar.css'

/**
 * Sidebar component
 * Displays contextual information (character or timeline details)
 * Manages sidebar open/close state and export functionality
 * 
 * @component
 * 
 * @example
 * <Sidebar />
 */
function Sidebar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    selectedCharacter,
    startName,
    startDate,
    startDatesData,
    characters,
  } = useAppContext()

  /**
   * Closes the sidebar
   * Accessible via close button or toggle
   */
  const handleClose = () => {
    setSidebarOpen(false)
  }

  /**
   * Opens the sidebar
   * Used by external toggle button
   */
  const handleOpen = () => {
    setSidebarOpen(true)
  }

  /**
   * Handles character position export
   * Exports current character positions to JSON file
   */
  const handleExport = () => {
    try {
      exportCharacterPositions(characters)
    } catch (error) {
      // Error is already logged in exportHelpers
      alert('Failed to export positions. Please try again.')
    }
  }

  // Get current timeline data
  const currentTimeline = startDatesData.find((s) => s.name === startName)

  return (
    <>
      {/* Sidebar panel */}
      <aside
        className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}
        aria-hidden={!sidebarOpen}
        aria-label="Details panel"
      >
        {/* Close button */}
        <Button
          variant="ghost"
          className="sidebar__close-btn"
          onClick={handleClose}
          ariaLabel="Close sidebar"
        >
          ✕
        </Button>

        {/* Sidebar content - switches between character and timeline */}
        <div className="sidebar__content">
          {selectedCharacter ? (
            <CharacterDetails character={selectedCharacter} />
          ) : (
            <TimelineDetails timeline={currentTimeline} />
          )}
        </div>

        {/* Sidebar footer with actions */}
        <footer className="sidebar__footer">
          <Button
            variant="secondary"
            size="small"
            onClick={handleExport}
            ariaLabel="Export character positions as JSON"
          >
            Export Positions
          </Button>
        </footer>
      </aside>

      {/* Toggle button - visible when sidebar is closed */}
      <Button
        variant="primary"
        className={`sidebar-toggle ${sidebarOpen ? 'sidebar-toggle--hidden' : ''}`}
        onClick={handleOpen}
        ariaLabel="Open sidebar"
      >
        &lt;
      </Button>
    </>
  )
}

export default Sidebar