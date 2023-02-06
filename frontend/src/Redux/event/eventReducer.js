import { DELETE_EVENT, SET_EVENTS, SET_EVENT_DETAILS } from "../../Constants/constants";

export const eventReducer = (state = [], action) => {
    switch (action.type) {
        case SET_EVENTS:
            return{
                ...state,
                events: action.payload
            }
        case SET_EVENT_DETAILS:
            return{
                ...state,
                eventDetails: action.payload
            }
        case DELETE_EVENT:
            return{
                ...state,
                events: state.events.filter(event=>event._id !== action.payload)
            }
        default:
            return state
    }
}