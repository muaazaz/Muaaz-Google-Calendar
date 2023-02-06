import { takeEvery, put } from 'redux-saga/effects'
import { LOG_IN, SET_USER, SIGN_UP, VAL_ERROR } from "../../Constants/constants";
import { getCookiesData } from '../../Utils/cookies';
import { fetchCall } from '../../Utils/fetchCall';

//For sigining up a user
function* signUp({ payload }) {
    try {
        const { firstName, lastName, userName, birthdate, email, password } = payload,
            { user, error } = yield fetchCall('/signup', 'POST', { firstName, lastName, userName, birthdate, email, password })
        if (user) {
            const { token, email } = getCookiesData()
            yield put({ type: SET_USER, payload: {token, email} })
        } else {
            yield put({ type: VAL_ERROR, payload: error })
        }
    } catch (error) {
        yield put({ type: VAL_ERROR, payload: error })
    }
}

//For logging in a user
function* logIn({payload}) {
    try {
        const { email, userName, password } = payload,
        { user, error } = yield fetchCall('/login', 'POST', { email, userName, password })
        if (user) {
            const { token, email } = getCookiesData()
            yield put({ type: SET_USER, payload: {token, email} })
        } else {
            yield put({ type: VAL_ERROR, payload: error })
        }
    } catch (error) {
        yield put({ type: VAL_ERROR, payload: error })
    }
}

export default function* userSaga() {
    yield takeEvery(SIGN_UP, signUp)
    yield takeEvery(LOG_IN, logIn)
}