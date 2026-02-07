import { useAppContext } from '@context/AppContext'
import { useLoading, LOADING_TYPES } from '@context/LoadingContext'
import TimelineItem from './TimelineItem'
import './TimelineNav.css'

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

  const { isLoading } = useLoading()

  const handleTimelineSelect = (timeline) => {
    setStartDate(timeline.date)
    setStartName(timeline.name)
    setSidebarOpen(true)
    setSelectedCharacter(null)
  }

  const isTransitioning = isLoading(LOADING_TYPES.TIMELINE)

  return (
    <nav
      className="timeline-nav"
      role="navigation"
      aria-label="Historical timeline navigation"
      aria-busy={isTransitioning}
    >
      {startDatesData.map((start) => (
        <TimelineItem
          key={start.id}
          startDate={start}
          isActive={start.name === startName}
          onClick={() => handleTimelineSelect(start)}
          disabled={isTransitioning}  // ← Disable during transition
        />
      ))}
      
      {/* Optional loading indicator on timeline */}
      {isTransitioning && (
        <div className="timeline-nav__loading" aria-live="polite">
          Switching timeline...
        </div>
      )}
    </nav>
  )
}

export default TimelineNav