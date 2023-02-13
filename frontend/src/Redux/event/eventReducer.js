import { DELETE_EVENT, SET_EVENTS, SET_EVENT_DETAILS } from "../../Constants/constants";

export const eventReducer = (state = [], action) => {
    switch (action.type) {
        case SET_EVENTS:
            return{
                ...state,
                timelyEvents: action.payload.timelyEvents,
                allDayEvents: action.payload.allDayEvents
            }
        case SET_EVENT_DETAILS:
            return{
                ...state,
                eventDetails: action.payload
            }
        case DELETE_EVENT:
            return{
                ...state,
                timelyEvents: state.timelyEvents.filter(event=>event._id !== action.payload),
                allDayEvents: state.allDayEvents.filter(event=>event._id !== action.payload)
            }
        default:
            return state
    }
}