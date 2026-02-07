import { useAppContext } from '@context/AppContext'
import { useLoading, LOADING_TYPES } from '@context/LoadingContext'
import { useSearch } from '@context/SearchContext'
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
  const { getFilteredDates, isFiltering } = useSearch()

  const handleTimelineSelect = (timeline) => {
    setStartDate(timeline.date)
    setStartName(timeline.name)
    setSidebarOpen(true)
    setSelectedCharacter(null)
  }

  const isTransitioning = isLoading(LOADING_TYPES.TIMELINE)
  const filteredDates = getFilteredDates()

  return (
    <nav
      className="timeline-nav"
      role="navigation"
      aria-label="Historical timeline navigation"
      aria-busy={isTransitioning}
    >
      {startDatesData.map((start) => {
        // Check if this timeline should be highlighted (has filtered character)
        const isHighlighted = isFiltering() && filteredDates.includes(start.date)
        
        return (
          <TimelineItem
            key={start.id}
            startDate={start}
            isActive={start.name === startName}
            isHighlighted={isHighlighted}
            onClick={() => handleTimelineSelect(start)}
            disabled={isTransitioning}
          />
        )
      })}

      {isTransitioning && (
        <div className="timeline-nav__loading" aria-live="polite">
          Switching timeline...
        </div>
      )}
    </nav>
  )
}

export default TimelineNav