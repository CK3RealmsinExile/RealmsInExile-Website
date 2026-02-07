import { useAppContext } from '@context/AppContext'
import TimelineItem from './TimelineItem'
import './TimelineNav.css'

/**
 * Timeline navigation component
 * Displays horizontal timeline with selectable date markers
 * Now supports URL state for shareable links
 * 
 * @component
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
   * Updates global state (which triggers URL update via AppContext)
   * 
   * @param {Object} timeline - Selected timeline object
   */
  const handleTimelineSelect = (timeline) => {
    setStartDate(timeline.date)
    setStartName(timeline.name)
    setSidebarOpen(true)
    setSelectedCharacter(null) // Clear character when changing timeline
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