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
  console.log("==RENDER in CalendarNew.jsx==")
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
      <div className="md:grid md:grid-cols-2 max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-cen ter p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
              </button>
            </div>
            <div className="grid-container">
              <div className='grid-item'>Su</div>
              <div className='grid-item'>M</div>
              <div className='grid-item'>Tu</div>
              <div className='grid-item'>W</div>
              <div className='grid-item'>Th</div>
              <div className='grid-item'>F</div>
              <div className='grid-item'>Sa</div>
            </div>
            <div className="grid-container">
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
