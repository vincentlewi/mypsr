import React, { useEffect, useState } from "react";
import moment from "moment";
import * as CSC from "./CalendarStyledComponents";
import ShowWeeks from "../weeks";
import ShowMonth from "../months";
import "../../styles/calendar.styles.css";

export const CalendarPicker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>(
    moment().format("MM-DD-YYYY")
  );
  const [showCurrentYear, setShowCurrentYear] = useState<number>(
    moment().year()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(moment().month());
  const [showCalendar, setShowCalnedar] = useState<any>();
  const [showCurrentWeek, setShowCurrentWeek] = useState<number>(
    moment().week()
  );

  /*This will render the whole component with current week and
   current date selected in the calendar*/
  useEffect(() => {
    weekDays(currentMonth, showCurrentYear);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  //Function which generates the week of a month
  function weekDays(currentMonth: number, currentYear: number) {
    const month: string = moment().month(currentMonth).format("MMMM");
    const endDate: moment.Moment = moment().date(0).month(month);
    const showWeekCalendar = Array(endDate.date())
      .fill(0)
      .map((_, i) =>
        moment()
          .date(i + 1)
          .month(month)
          .year(currentYear)
      )
      .map((day) => ({ day, week: day.week() }))
      .filter(
        ({ week }, i, arr) => arr.findIndex((info) => info.week === week) === i
      )
      .map(({ day, week }) => ({
        week,
        days: Array(7)
          .fill(0)
          .map((_, i) => moment(day).week(week).startOf("week").add(i, "day")),
      }));
    setShowCalnedar(showWeekCalendar);
  }

  //Function to move back
  const moveBack = () => {
    setShowCurrentWeek(showCurrentWeek - 1);
    if (showCalendar[0].week === showCurrentWeek) {
      if (currentMonth === 0) {
        //Every year is of 52 weeks so this will set to 52nd of the previous year
        setShowCurrentWeek(52);
        //This will set month to last month of the previous year
        setCurrentMonth(11);
        setShowCurrentYear(showCurrentYear - 1);
        weekDays(11, showCurrentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
        weekDays(currentMonth - 1, showCurrentYear);
      }
    }
  };

  //Function to move Forth
  const moveForth = () => {
    setShowCurrentWeek(showCurrentWeek + 1);
    if (showCalendar[4].week === showCurrentWeek) {
      if (currentMonth === 11) {
        //Every year start with 1st week so this will set to 1st week of the next year
        setShowCurrentWeek(1);
        //This will set month to first month of the next year
        setCurrentMonth(0);
        setShowCurrentYear(showCurrentYear + 1);
        weekDays(0, showCurrentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
        weekDays(currentMonth + 1, showCurrentYear);
      }
    }
  };

  //Function to highlight the clicked day
  const handleSelectedDate = (defaultSelected: any) => {
    setCurrentDate(moment(defaultSelected).format("MM-DD-YYYY"));
  };

  return (
    <CSC.MainWrapper>
      {/* This section displays the head of this UI */}
      <ShowMonth
        showCurrentYear={showCurrentYear}
        currentMonth={currentMonth}
        moveBack={moveBack}
        moveForth={moveForth}
      />

      {/* This section displays the Day Name for each month */}
      <ShowWeeks />

      {/* This section displays the Days for each month */}
      <CSC.DaysWrapper className="days">
        {showCalendar?.length > 0 &&
          showCalendar.map((value: any, index: number) =>
            value.days.map((day: any, i: number) => {
              if (value.week === showCurrentWeek) {
                return (
                  <CSC.DaysList
                    key={i}
                    className={`${
                      moment(day._d).format("MM-DD-YYYY") === currentDate
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSelectedDate(day._d)}
                  >
                    {moment(day._d).format("DD")}
                  </CSC.DaysList>
                );
              }
            })
          )}
      </CSC.DaysWrapper>
    </CSC.MainWrapper>
  );
};
