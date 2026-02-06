import { TimelineNav } from '@components/Timeline'
import { MapContainer } from '@components/Map'
import { Sidebar } from '@components/Sidebar'
import { useAppContext } from '@context/AppContext'
import '@styles/App.css'

/**
 * Main application component
 * Orchestrates layout of timeline, map, and sidebar components
 * 
 * @component
 */
function App() {
  const { sidebarOpen } = useAppContext()

  return (
    <div className="app">
      <TimelineNav />
      <MapContainer />
      <Sidebar isOpen={sidebarOpen} />
    </div>
  )
}

export default App