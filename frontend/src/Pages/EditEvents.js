import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Components/Shared_Components/Input";
import Select from "../Components/Shared_Components/Select";
import { getLocations } from "../Utils/location";
import { editEvent } from "../Redux/event/eventAction"

const EditEvents = () => {
  var strt = ''
  const { id } = useParams(),
    data = useSelector((state) => state.eventReducer),
    dispatch = useDispatch(),
    history = useHistory(),
    [browserLocations, setBrowserLocations] = useState([]),
    [allDay, setAllDay] = useState(false),
    [item, setItem] = useState(""),
    [location, setLoc] = useState(""),
    [start, setStart] = useState(),
    [end, setEnd] = useState(""),
    [once, setOnce] = useState(true),
    [error, setError] = useState();

  const calllLocationApi = async () => {
    await setBrowserLocations(await getLocations())
  }

  //Setting previous state of data
  const setPrevious = (event) => {
    setItem(event.item);
    setStart(event.start);
    setEnd(event.end);
    setLoc(event.location);
    setAllDay(event.allDay);
  };

  useEffect(() => {
    if (once) {
      //TO render only once
      setOnce(false);
      //Calling api to create locations selector
      calllLocationApi()
    }
    if (data.eventDetails) {
      setPrevious(data.eventDetails)
    }
  }, [data.eventDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Calling API to update event data 
    dispatch(editEvent({ id, start, end, item, location, strt }))
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
                var id = "";
                document.querySelectorAll(".start").forEach((opt) => {
                  if (opt.value === e.target.value) {
                    id = opt.id;
                    strt = id;
                  }
                });
                document.querySelectorAll(".end").forEach((opt) => {
                  if (parseFloat(opt.id) <= parseFloat(id)) {
                    opt.disabled = true;
                  }
                });
                document.querySelector(".end-time").disabled = false;
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
          options={browserLocations}
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