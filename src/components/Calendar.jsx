import { useState } from 'react'
import { useEvents, useEventDispatch } from '../context/EventContext'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import EventFilters from './EventFilters'
import './CalendarHeader.css'
import './CalendarGrid.css'

function Calendar() {
  const { events, currentMonth, selectedCategory } = useEvents()
  const dispatch = useEventDispatch()
  
  // Generate calendar days
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  
  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  })

  // Filter events by category
  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory)

  const handleDateClick = (date) => {
    dispatch({ type: 'SET_SELECTED_DATE', date })
    dispatch({ type: 'OPEN_MODAL' })
  }
  
  return (
    <div className="calendar-container">
      <EventFilters />
      <CalendarHeader />
      <CalendarGrid 
        days={days}
        events={filteredEvents}
        onDateClick={handleDateClick}
        currentMonth={currentMonth}
      />
    </div>
  )
}

export default Calendar




