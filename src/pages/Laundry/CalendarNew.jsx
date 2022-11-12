import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
  endOfWeek,
  isPast
} from 'date-fns'
import { useState } from 'react'
import './Laundry.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CalendarNew(props) {
  // console.log("==RENDER in CalendarNew.jsx==")
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  return (
    <div className="pt-16">
      <div className="">
          <div className="">
            <div className="d-flex flex-column">
              <h2>
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <div className="d-flex flex-row">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="createbtn"
                >
                  <span className="sr-only">Previous month</span>
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="createbtn"
                >
                  <i class="bi bi-chevron-right"></i>
                  <span className="">Next month</span>
                </button>
              </div>
            </div>
            <div className="flex flex-column justify-content-center">
              <div className="grid-container mx-auto my-2">
                <div className='grid-item'>Su</div>
                <div className='grid-item'>M</div>
                <div className='grid-item'>Tu</div>
                <div className='grid-item'>W</div>
                <div className='grid-item'>Th</div>
                <div className='grid-item'>F</div>
                <div className='grid-item'>Sa</div>
              </div>
              <div className="grid-container mx-auto">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      'py-1.5'
                    )}
                  >
                    <button
                      type="button"
                      id = {format(day, 'yyyy-MM-dd')}
                      onClick={(e) => {setSelectedDay(day);props.getDateID(e.currentTarget.id)}}
                      disabled = {isPast(day) && !isToday(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && 
                          'selected',
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'today',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          'this-month',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          'not-this-month',
                        // isEqual(day, selectedDay) && 
                        //   isToday(day) && 
                        //   'today-selected',
                        // kalo mau selected today beda dari selected not today pake ini
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'selected',
                        !isEqual(day, selectedDay) && 
                          'hover',
                        // (isEqual(day, selectedDay) || isToday(day)) &&
                        //   'today',
                        // idk useless sih kyknya
                        'grid-item dates'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}
                      id={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>
                  </div>
                ))}
              </div>
              </div>
          </div>
        </div>
    </div>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
