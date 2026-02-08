import { TimelineNav } from '@components/Timeline'
import { MapContainer } from '@components/Map'
import { Sidebar } from '@components/Sidebar'
import { EditModeToggle, CharacterSearch } from '@components/shared'
import '@styles/App.css'

/**
 * Main application component
 */
function App() {
  return (
    <div className="app">
      <TimelineNav />
      <EditModeToggle />
      <CharacterSearch />
      <MapContainer />
      <Sidebar />
    </div>
  )
}

export default App