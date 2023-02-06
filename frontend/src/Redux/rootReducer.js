import { combineReducers } from "redux";
import {userValidation} from './user/userReducer'
import { eventReducer } from "./event/eventReducer";



export default combineReducers({
    userValidation,
    eventReducer
})