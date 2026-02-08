import { useAppContext } from '@context/AppContext'
import { useEditMode } from '@context/EditModeContext'  // ← Add this
import { exportCharacterData } from '@utils/exportHelpers'
import { Button } from '@components/shared'
import CharacterDetails from './CharacterDetails'
import TimelineDetails from './TimelineDetails'
import './Sidebar.css'

function Sidebar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    selectedCharacter,
    startName,
    startDatesData,
    characters,
  } = useAppContext()
  
  const { isEditMode } = useEditMode()  // ← Add this

  const handleClose = () => {
    setSidebarOpen(false)
  }

  const handleOpen = () => {
    setSidebarOpen(true)
  }

  const handleExport = () => {
    try {
      exportCharacterData(characters, 'characters.json')
    } catch (error) {
      alert('Failed to export data. Please try again.')
    }
  }

  const currentTimeline = startDatesData.find((s) => s.name === startName)

  return (
    <>
      <aside
        className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}
        aria-hidden={!sidebarOpen}
        aria-label="Details panel"
      >
        <Button
          variant="ghost"
          className="sidebar__close-btn"
          onClick={handleClose}
          ariaLabel="Close sidebar"
        >
          ✕
        </Button>

        <div className="sidebar__content">
          {selectedCharacter ? (
            <CharacterDetails character={selectedCharacter} />
          ) : (
            <TimelineDetails timeline={currentTimeline} />
          )}
        </div>

        {/* Only show export button in edit mode */}
        {isEditMode && (
          <footer className="sidebar__footer">
            <Button
              variant="secondary"
              size="small"
              onClick={handleExport}
              ariaLabel="Export complete character data as JSON"
            >
              Export Characters
            </Button>
          </footer>
        )}
      </aside>

      <button
        className={`sidebar-toggle ${sidebarOpen ? 'sidebar-toggle--hidden' : ''}`}
        onClick={handleOpen}
        aria-label="Open sidebar"
      >
        &lt;
      </button>
    </>
  )
}

export default Sidebar