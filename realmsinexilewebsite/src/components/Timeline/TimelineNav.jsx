import { useAppContext } from '@context/AppContext'
import TimelineItem from './TimelineItem'
import './TimelineNav.css'

/**
 * Timeline navigation component
 * Displays horizontal timeline with selectable date markers
 * Connected to global app context for state management
 * 
 * @component
 * 
 * @example
 * <TimelineNav />
 */
function TimelineNav() {
  const {
    startName,
    startDate,
    setStartName,
    setStartDate,
    setSidebarOpen,
    setSelectedCharacter,
    startDatesData,
  } = useAppContext()

  /**
   * Handles timeline selection
   * Updates global state and opens sidebar with timeline info
   * 
   * @param {Object} timeline - Selected timeline object
   */
  const handleTimelineSelect = (timeline) => {
    setStartDate(timeline.date)
    setStartName(timeline.name)
    setSidebarOpen(true)
    setSelectedCharacter(null) // Clear character selection when viewing timeline info
  }

  return (
    <nav 
      className="timeline-nav" 
      role="navigation" 
      aria-label="Historical timeline navigation"
    >
      {startDatesData.map((start) => (
        <TimelineItem
          key={start.id}
          startDate={start}
          isActive={start.name === startName}
          onClick={() => handleTimelineSelect(start)}
        />
      ))}
    </nav>
  )
}

export default TimelineNav