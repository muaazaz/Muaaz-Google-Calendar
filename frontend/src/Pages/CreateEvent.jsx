import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import Input from "../Components/Shared_Components/Input";
import Select from "../Components/Shared_Components/Select";
import { getCookiesData } from "../Utils/cookies";
import { getLocations } from "../Utils/location";
import {createEvent} from "../Redux/event/eventAction"


const CreateEvent = () => {
  let strt = ''
  const history = useHistory(),
    dispatch = useDispatch(),
    [browserLocations, setBrowserLocations]=useState([]),
    [allDay, setAllDay] = useState(false),
    [item, setItem] = useState(""),
    [location, setLocation] = useState(""),
    [start, setStart] = useState('ALL-DAY'),
    [end, setEnd] = useState(""),
    [owner, setOwner] = useState(""),
    [error, setError] = useState("")

    const calllLocationApi = async()=>{
      await setBrowserLocations( await getLocations())
    }

  useEffect(() => {
    const { id } = getCookiesData()
    setOwner(id);
    calllLocationApi()

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createEvent({ start, end, item, location, owner, allDay, strt }))
    history.push('/dashboard')
  };

  return (
    <div className="create">
      <h1>Create An Event:</h1>
      <p>Please select what type of event you want to create:</p>
      <div className="options">
        <input type="radio" id="allday" name="events-option" onChange={() => { setAllDay(true) }} />
        <label htmlFor="allday">All-Day Event</label>
        <input type="radio" id="timely" name="events-option" defaultChecked onChange={() => { setAllDay(false) }} />
        <label htmlFor="timely">Timely Event</label><br />
      </div>
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

        {
          allDay ?
            <div>
              <Input
                label={'Time'}
                readOnly={true}
                value={'ALL-DAY'}
              />
            </div>
            :
            <div>
              <Select
                type={'start'}
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
                      strt=id;
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
                type={'end'}
                className={"end-time"}
                value={end}
                label={'End'}
                disabled={true}
                onChange={(e) => {
                  setError((e) => (undefined))
                  setEnd(e.target.value)
                }}
              />
            </div>
        }
        <Autocomplete
          disablePortal
          options={browserLocations}
          sx={{ width: "100%", marginTop: '20px' }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          onChange={(e) => {
            setError((e) => (undefined))
            setLocation(e.target.textContent);
          }}
        />
        {error && <h5 className="error">{error}</h5>}
        <button className="create-btn">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;