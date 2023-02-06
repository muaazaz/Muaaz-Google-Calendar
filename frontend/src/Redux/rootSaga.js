import { fork } from "redux-saga/effects";
import eventSaga from "./event/eventSaga";
import userSaga from "./user/userSaga";

export default function* rootSaga() {
    yield fork(userSaga)
    yield fork(eventSaga)

}