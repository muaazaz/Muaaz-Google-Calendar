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

  const get_Events = async()=>{
    dispatch(getEvents())
  } 

  useEffect(() => {
      //Calling API
      get_Events()

      if(data.events){
        setEvents(data.events)
      }
      
  }, [data.events]);

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
            <h2 className="tag"> Event :</h2>
            <h1>{event.start}</h1>
            <h1>{event.end}</h1>
            <span>{event.item}</span>
            <span>{event.location}</span>
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