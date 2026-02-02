"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  const minTime = new Date();
  minTime.setHours(8, 0, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(17, 0, 0, 0);

  console.log(data);

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98vh" }}
      onView={handleOnChangeView}
      min={minTime}
      max={maxTime}
    />
  );
};

export default BigCalendar;
