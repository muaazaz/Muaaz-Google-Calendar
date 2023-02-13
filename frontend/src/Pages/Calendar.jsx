import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Events from "../Components/Shared_Components/Events";
import Time from "../Components/Shared_Components/Time";
import { getCurrentDate } from "../Utils/date";

const Calendar = () => {
  const [events, setEvents] = useState({
      timelyEvents: [],
      allDayEvents: [],
    }),
    data = useSelector((state) => state.eventReducer),
    [date, setDate] = useState("")

  useEffect(() => {
    setDate(getCurrentDate());
    setEvents({
        ...events,
        timelyEvents: data.timelyEvents,
        allDayEvents: data.allDayEvents,
    });
  },[]);

  return (
    <div className="main">
      <div id="date">
        <p id="dt">{date}</p>
      </div>
      <div id="daily">
        {events.allDayEvents.map((event) => (
          <Events key={event._id} event={event} allDay={true}/>
        ))}
      </div>
      <div className="time-table">
        <Time events={events.timelyEvents} />
      </div>
    </div>
  );
};
export default Calendar;