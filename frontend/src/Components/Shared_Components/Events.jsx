const Events = ({ event, allDay, compareArray, addChild }) => {

  const calculateStart = (event) => {
    let start = "",
      zone = "";
    let split = event.start.toString().split(".");
    if (split[0] >= 12) {
      zone = "PM";
    } else {
      zone = "AM";
    }
    if (split[1]) {
      start = split[0] + ":30" + zone;
    } else {
      start = split[0] + ":00" + zone;
    }
    return start
  };

  const calculateHeight = (event) => {
    let height = "",
      halfHeight = Math.round(event.end - event.start) - (event.end - event.start) === 0.5 ? 1 : 0;
    height = ((parseInt(event.end - event.start) * 2  + halfHeight)* 4).toString() + "rem";
    return height;
  };
  const calculateMargin = (event, compareEvent)=>{
    let marginTop = "",
      halfDiff = Math.round(event.start - compareEvent.start) - (event.start - compareEvent.start) === 0.5 ? 1 : 0;
    marginTop = ((parseInt(event.start - compareEvent.start) * 2  + halfDiff)* 4).toString() + "rem";
    return marginTop

  }
  return (
    <>
      {allDay ? (
        <div key={event._id} className="evt">
          <p className="gry">ALL-DAY</p>
          <h1>{event.item}</h1>
          <p className="grn">{event.location}</p>
        </div>
      ) : (
        <div className="events" style={{ height: calculateHeight(event) }}>
          <div className="content">
            <p className="content-item">{calculateStart(event)}</p>
            <h1 className="content-item">{event.item}</h1>
            <p className="content-item">{event.location}</p>
          </div>
          {compareArray.map((compareEvent) => {
            return (
              <>
                {(event.end - compareEvent.start > 0 &&
                  (event.start !== compareEvent.start &&
                  event.end !== compareEvent.end)) && (
                    <div
                      className="events"
                      style={{ height: calculateHeight(compareEvent), marginTop: calculateMargin(event, compareEvent)}}
                    >
                      <div className="content">
                        <p className="content-item">{calculateStart(compareEvent)}</p>
                        <h1 className="content-item">{compareEvent.item}</h1>
                        <p className="content-item">{compareEvent.location}</p>
                      </div>
                    </div>
                  )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Events;
