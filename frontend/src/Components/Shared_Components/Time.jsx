import { useEffect } from "react";
import { timeArray } from "../../Constants/constants";
import { checkChild, childArray } from "../../Utils/events";
import Events from "./Events";

const Time = ({ events }) => {
  let i = 8.5
  useEffect(()=>{},[events])

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
                  {(event.start === i && (!childArray.includes(event._id))) && (
                    <Events
                      event={event}
                      allDay={false}
                      childEvent={checkChild(event, events.slice(index + 1, events.length))}
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