import React from "react";
import moment from "moment";
import * as CSC from "../calendar/CalendarStyledComponents";
import { MonthsProps } from "../types/Months.types";
import "../../styles/calendar.styles.css";

const ShowMonth = ({
  showCurrentYear,
  currentMonth,
  moveBack,
  moveForth,
}: MonthsProps) => {
  return (
    <React.Fragment>
      <h1>Week Calendar for {showCurrentYear}</h1>
      <CSC.MonthWrapper>
        <CSC.TitleWrapper>
          <CSC.ButtonsWrapper
            style={{ float: "left" }}
            onClick={() => moveBack()}
          >
            &#10094;
          </CSC.ButtonsWrapper>
          <CSC.ButtonsWrapper
            style={{ float: "right" }}
            onClick={() => moveForth()}
          >
            &#10095;
          </CSC.ButtonsWrapper>
          <CSC.ButtonsWrapper>
            {moment().month(currentMonth).format("MMMM")}
            <br />
            <span style={{ fontSize: "18px" }}>{showCurrentYear}</span>
          </CSC.ButtonsWrapper>
        </CSC.TitleWrapper>
      </CSC.MonthWrapper>
    </React.Fragment>
  );
};

export default ShowMonth;
