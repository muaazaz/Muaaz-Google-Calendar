import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Components/Shared_Components/Input";
import Select from "../Components/Shared_Components/Select";
import { getLocations } from "../Utils/location";
import { editEvent } from "../Redux/event/eventAction"

const EditEvents = () => {
  const { id } = useParams(),
    data = useSelector((state) => state.eventReducer),
    dispatch = useDispatch(),
    history = useHistory(),
    [browserLocations, setBrowserLocations] = useState([]),
    [formData, setFormData] = useState({
      allDay: false,
      item: "",
      location: "",
      start: "ALL-DAY",
      end: "",
      strt: ""
    }),
    [once, setOnce] = useState(true),
    [error, setError] = useState();

  const calllLocationApi = async () => {
    await setBrowserLocations(await getLocations())
  }

  //Setting previous state of data
  const setPrevious = (event) => {
    setFormData({
      item: event.item,
      location: event.location,
      start: event.start,
      end: event.end,
      allDay: event.allDay
    })
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
    dispatch(editEvent(id,formData))
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
          value={formData.item}
          onChange={(e) => {
            setError(undefined)
            setFormData({
              ...formData,
              item: e.target.value
            })
          }}
        />
        {formData.allDay ?
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
              value={formData.start}
              label={'Start'}
              disabled={false}
              onChange={(e) => {
                setError(undefined)
                setFormData({
                  ...formData,
                  start: e.target.value
                })
                let id = "";
                document.querySelectorAll(".start").forEach((opt) => {
                  if (opt.value === e.target.value) {
                    id = opt.id;
                    setFormData({
                      ...formData,
                      strt: id
                    })
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
              value={formData.end}
              label={'End'}
              disabled={true}
              onChange={(e) => {
                setError(undefined)
                setFormData({
                  ...formData,
                  end: e.target.value
                })
              }}
            />
          </>
        }
        <Autocomplete
          disablePortal
          value={formData.location}
          options={browserLocations}
          sx={{ width: "100%", padding: "0" }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          onChange={(e) => {
            setError(undefined)
            setFormData({
              ...formData,
              location: e.target.value
            })
          }}
        />
        {error && <h5 className="error">{error}</h5>}
        <button className="create-btn">Save</button>
      </form>
    </div>
  );
};

export default EditEvents;