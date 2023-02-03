import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchCall } from "../Utils/fetchCall";

const Dashboard = () => {
  const history = useHistory(),
    [events, setEvents] = useState([]),
    [error, setError] = useState();

  const getEvents = async()=>{
    const data = await fetchCall('/events','GET')
    if (data.events) {
      setEvents(data.events)
    } else {
        setError(data.error)
    }
  }

  useEffect(() => {
      //Calling API
      getEvents()
      
  }, [events]);

  //Click functions
  //Showing calendar page
  const handleClick = () => {
    history.push("/calendar");
  };
  //Deleting event
  const handleEventsDelete = async(id) => {
    await fetchCall("/event/"+id, "DELETE")
  };
  //Takes to the edit page
  const handleEventsEdit = (id) => {
    history.push("/event/" + id);
  };

  return (
    <div className="dashboard">
      {error && <h1 className="error">{error}</h1>}
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
