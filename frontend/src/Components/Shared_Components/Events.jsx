import {
  calculateHeight,
  calculateMargin,
  calculateStart,
} from "../../Utils/events";
const Events = ({ event, allDay, eventChildArray }) => {
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
          {eventChildArray &&
            eventChildArray.map((childEvent) => (
              <div
                className="child events"
                style={{
                  height: calculateHeight(childEvent),
                  marginTop: calculateMargin(event, childEvent),
                }}
              >
                <div className="content">
                  <p className="content-item">{calculateStart(childEvent)}</p>
                  <h1 className="content-item">{childEvent.item}</h1>
                  <p className="content-item">{childEvent.location}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Events;
