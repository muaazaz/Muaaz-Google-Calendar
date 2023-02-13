import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteEvent, getEvents } from "../Redux/event/eventAction";
import {getEventDetails} from "../Redux/event/eventAction"

const Dashboard = () => {
  const history = useHistory(),
    [events, setEvents] = useState([]),
    dispatch = useDispatch(),
    data = useSelector((state)=>state.eventReducer)

  useEffect(() => {
      //Calling API
      dispatch(getEvents())
      if(data.allDayEvents && data.timelyEvents){
        setEvents(data.allDayEvents.concat(data.timelyEvents))
      }
  }, [data]);

  //Click functions
  //Showing calendar page
  const handleClick = () => {
    history.push("/calendar");
  };
  //Deleting event
  const handleEventsDelete = async(id) => {
    dispatch(deleteEvent(id))
  };
  //Takes to the edit page
  const handleEventsEdit = (id) => {
    dispatch(getEventDetails(id))
    history.push("/event/" + id);
  };

  return (
    <div className="dashboard">
      {events &&
        events.map((event) => (
          <div className="event-div" key={event._id}>
            <h2 className="tag">Events :</h2>
            {event.allDay ? 
            <h1 className="time">ALL-DAY</h1> 
            :
            <>
            <h1 className="timers">From : </h1>
            <h1 className="time">{event.start}</h1>
            <h1 className="timers">To : </h1>
            <h1 className="time">{event.end}</h1>
            </>
            }
            <h3 className="tag">Name : </h3>
            <p>{event.item}</p>
            <h3 className="tag">Location : </h3>
            <p>{event.location}</p>
            <button
              className="edt"
              onClick={() => {
                handleEventsEdit(event._id);
              }}
            >
              Edit Event
            </button>
            <button
              className="dlt"
              onClick={() => {
                handleEventsDelete(event._id);
              }}
            >
              Delete Event
            </button>
          </div>
        ))}
      <button className="clnd" onClick={handleClick}>View Calendar</button>
    </div>
  );
};

export default Dashboard;