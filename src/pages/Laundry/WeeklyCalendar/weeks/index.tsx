import React from 'react'
import * as CSC from "../calendar/CalendarStyledComponents"

const ShowWeeks: React.FC = () => {
  return (
    <CSC.WeekDaysWrapper>
    <CSC.WeekDaysList>Su</CSC.WeekDaysList>
    <CSC.WeekDaysList>Mo</CSC.WeekDaysList>
    <CSC.WeekDaysList>Tu</CSC.WeekDaysList>
    <CSC.WeekDaysList>We</CSC.WeekDaysList>
    <CSC.WeekDaysList>Th</CSC.WeekDaysList>
    <CSC.WeekDaysList>Fr</CSC.WeekDaysList>
    <CSC.WeekDaysList>Sa</CSC.WeekDaysList>
  </CSC.WeekDaysWrapper>
  )
}

export default ShowWeeks
