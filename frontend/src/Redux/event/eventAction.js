import { CREATE_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS, GET_EVENT_DETAILS } from "../../Constants/constants"

export const createEvent = (payload)=>{
    return({
        type:CREATE_EVENT,
        payload
    })
} 

export const editEvent = (payload)=>{
    return({
        type:EDIT_EVENT,
        payload
    })
}

export const getEvents = ()=>{
    return({
        type:GET_EVENTS
    })
}


export const getEventDetails = (payload)=>{
    return({
        type: GET_EVENT_DETAILS,
        payload
    })
}

export const deleteEvent = (payload)=>{
    return({
        type:DELETE_EVENT,
        payload
    })
}