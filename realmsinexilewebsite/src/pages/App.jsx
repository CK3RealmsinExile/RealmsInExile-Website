import { TimelineNav } from '@components/Timeline'
import { MapContainer } from '@components/Map'
import { Sidebar } from '@components/Sidebar'
import { EditModeToggle } from '@components/shared'  // ← Add this
import '@styles/App.css'

/**
 * Main application component
 */
function App() {
  return (
    <div className="app">
      <TimelineNav />
      <EditModeToggle />  {/* ← Add this */}
      <MapContainer />
      <Sidebar />
    </div>
  )
}

export default App