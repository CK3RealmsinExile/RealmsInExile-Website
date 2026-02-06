import { useState, useCallback } from 'react'

/**
 * Custom hook for timeline state management
 * 
 * @param {Array} startDatesData - Array of timeline data
 * @returns {Object} Timeline state and handlers
 */
export function useTimelineState(startDatesData) {
  const [startName, setStartName] = useState(startDatesData[0].name)
  const [startDate, setStartDate] = useState(startDatesData[0].date)

  const selectTimeline = useCallback(
    (name, date) => {
      setStartName(name)
      setStartDate(date)
    },
    []
  )

  const currentTimeline = startDatesData.find((s) => s.name === startName)

  return {
    startName,
    startDate,
    selectTimeline,
    currentTimeline,
  }
}