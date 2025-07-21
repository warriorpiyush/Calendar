import { useEvents, useEventDispatch } from '../context/EventContext'
import { format, addMonths, subMonths } from 'date-fns'
import './CalendarHeader.css'

export default function CalendarHeader() {
  const { currentMonth } = useEvents()
  const dispatch = useEventDispatch()

  const goToPreviousMonth = () => {
    dispatch({ 
      type: 'SET_CURRENT_MONTH', 
      month: subMonths(currentMonth, 1) 
    })
  }

  const goToNextMonth = () => {
    dispatch({ 
      type: 'SET_CURRENT_MONTH', 
      month: addMonths(currentMonth, 1) 
    })
  }

  const goToToday = () => {
    dispatch({ 
      type: 'SET_CURRENT_MONTH', 
      month: new Date() 
    })
  }

  const openAddEventModal = () => {
    dispatch({ type: 'OPEN_MODAL' })
  }

  return (
    <div className="calendar-header">
      <div className="header-left">
        <button onClick={goToPreviousMonth} className="nav-button">
          ‹
        </button>
        <h2 className="month-year">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={goToNextMonth} className="nav-button">
          ›
        </button>
      </div>
      
      <div className="header-right">
        <button onClick={goToToday} className="today-button">
          Today
        </button>
        <button onClick={openAddEventModal} className="add-event-button">
          + Add Event
        </button>
      </div>
    </div>
  )
}
