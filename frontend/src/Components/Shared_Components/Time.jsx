import { useState } from "react";
import { useEffect } from "react";
import { timeArray } from "../../Constants/constants";
import Events from "./Events";

const Time = ({ events }) => {
  useEffect(() => {}, [events]);

  let i = 8.5;
  const [childArray, setChildArray] = useState([]);
  const addChild = (event) => {
    setChildArray([
        ...childArray,
        event
    ])
  }

  return (
    <>
      <h1 className="time-logo">Time Table :</h1>
      {timeArray.map((time) => {
        i = i + 0.5;
        return (
          <div
            key={time}
            className={
              Math.round(i) - i === 0.5
                ? "timely-divs-half"
                : "timely-divs-full"
            }
            id={i}
          >
            <div className="time-slot">
              <span>{time}</span>
              {i >= 12 ? <span> -PM </span> : <span> -AM </span>}
            </div>
            {events.map((event, index) => {
              return (
                <>
                  {event.start === i && !childArray.includes(event) && (
                    <Events
                      event={event}
                      allDay={false}
                      compareArray={events.slice(index, events.length)}
                      addChild={addChild}
                    />
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Time;