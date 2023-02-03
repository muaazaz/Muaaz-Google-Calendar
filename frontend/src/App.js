import Routes from "./Components/Routes";
import CalendarProvider from "./Context/CalendarContext";
import EventProvider from "./Context/eventContext";


function App() {
  return (
    <div className="App">
      <CalendarProvider>
        <EventProvider>
          <Routes/>
        </EventProvider>
      </CalendarProvider>
    </div>
  );
}

export default App;
