import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Input from "../Components/Shared_Components/Input";
import Select from "../Components/Shared_Components/Select";
import { eventContext } from "../Context/eventContext";
import { fetchCall } from "../Utils/fetchCall";

const EditEvents = () => {
  const { id } = useParams(),
    history = useHistory(),
    { uniqueLoc, createLocations, handleStartTimeChange, strt } = useContext(eventContext),
    [allDay, setAllDay] = useState(false),
    [item, setItem] = useState(""),
    [location, setLoc] = useState(""),
    [start, setStart] = useState(),
    [end, setEnd] = useState(""),
    [once, setOnce] = useState(true),
    [error, setError] = useState();

  //Setting previous state of data
  const setPrevious = (event) => {
    setItem(event.item);
    setStart(event.start);
    setEnd(event.end);
    setLoc(event.location);
    setAllDay(event.allDay);
  };

  //Calling api for data
  const getEventDetails = async () => {
    const data = await fetchCall("/event/" + id, "GET")
    if (data.event) {
      setPrevious(data.event);
    } else {
      setError(data.error);
    }
  }

  useEffect(() => {
    if (once) {

      getEventDetails()
      //TO render only once
      setOnce(false);
      //Calling api to create locations selector
      createLocations()
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Calling API to update event data 
    await fetchCall("/event/" + id, "PUT", { start, end, item, location, strt })
    history.push("/dashboard");
  };

  return (
    <div className="create">
      <h1>Edit Event:</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label={'Name'}
          maxLength={30}
          placeholder={"please enter an name for event"}
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        {allDay ?
          <>
            <Input
              label={'Time'}
              readOnly={true}
              value={'ALL-DAY'}
            />
          </>
          :
          <>
            <Select
              time={'start'}
              className={"start-time"}
              value={start}
              label={'Start'}
              disabled={false}
              onChange={(e) => {
                setError((e) => (undefined))
                setStart(e.target.value)
                handleStartTimeChange(e)
              }}
            />
            <Select
              time={'end'}
              className={"end-time"}
              value={end}
              label={'End'}
              disabled={true}
              onChange={(e) => {
                setError((e) => (undefined))
                setEnd(e.target.value)
              }}
            />
          </>
        }
        <Autocomplete
          disablePortal
          value={location}
          options={uniqueLoc}
          sx={{ width: "100%", padding: "0" }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          onChange={(e) => {
            setLoc(e.target.textContent);
          }}
        />
        {error && <h5 className="error">{error}</h5>}
        <button className="create-btn">Save</button>
      </form>
    </div>
  );
};

export default EditEvents;