import { CREATE_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS, GET_EVENT_DETAILS, SET_EVENTS, SET_EVENT_DETAILS} from "../../Constants/constants";
import { put, takeEvery } from "redux-saga/effects"
import { fetchCall } from "../../Utils/fetchCall"


function* createEvent({ payload }) {
    const { start, end, item, location, owner, allDay} = payload
    yield fetchCall("/event", "POST", { start, end, item, location, owner, allDay})
}

function* getEvents() {
    const data = yield fetchCall('/events', 'GET')
    yield put({ type: SET_EVENTS, payload: {allDayEvents: data.allDayEvents, timelyEvents: data.timelyEvents} })
}

function* getEventDetails({ payload }) {
    const id = payload,
        data = yield fetchCall("/event/" + id, "GET")
    yield put({ type: SET_EVENT_DETAILS, payload: data.event })
}

function* deleteEvent({ payload }) {
    const id = payload
    yield fetchCall("/event/" + id, "DELETE")
}

function* editEvent({ payload }) {
    
    const { id, formData} = payload
        yield fetchCall("/event/" + id, "PUT", formData)
}

export default function* eventSaga() {
    yield takeEvery(CREATE_EVENT, createEvent)
    yield takeEvery(EDIT_EVENT, editEvent)
    yield takeEvery(GET_EVENT_DETAILS, getEventDetails)
    yield takeEvery(GET_EVENTS, getEvents)
    yield takeEvery(DELETE_EVENT, deleteEvent)
}