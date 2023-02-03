import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CalendarContext } from "../Context/CalendarContext";
import { fetchCall } from "../Utils/fetchCall";

const Calendar = () => {
    var arr2 = [];
    var arr1 = [];
    const [timelyEvents, setTimelyEvents] = useState([]),
    [allDayEvents, setAllDayEvents] = useState([]),
    [once, setOnce] = useState(true),
    [error, setError] = useState(''),
    [date, setDate] = useState(''),
    { createTime, createAllDayEvent, createEvents, getCurrentDate } = useContext(CalendarContext)


    const getData = async () => {
        const data = await fetchCall('/events','GET')
        if (data.events) {
            data.events.forEach((event) => {
                if (event.allDay) {
                    arr1.push(event)
                } else {
                    arr2.push(event)
                }
            })
            setTimelyEvents(arr2)
            setAllDayEvents(arr1)
        } else {
            setError(data.error)
        }
    }

    useEffect(() => {
        if (once) {
            setDate(getCurrentDate)
            //Calling API
            getData()
            //Making sure API is called only once
            setOnce(false)
        }
        //Generate timetable
        createTime()
        //Create Daily events
        createAllDayEvent(allDayEvents);
        //Creating timely events
        createEvents(timelyEvents);

    }, [timelyEvents, allDayEvents])

    return (
        <div className="main">
            <div className="error">{error}</div>
            <div id="date">
                <p id="dt">{date}</p>
            </div>
            <div id="daily">

            </div>
            <div id="time">
                <div id="AM">
                    <span id="red">AM</span>
                    <div id="amclck" className="clck">
                    </div>
                </div>
                <div id="PM">
                    <span id="blue">PM</span>
                    <div id="pmclck" className="clck">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;