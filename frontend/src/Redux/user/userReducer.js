import { REMOVE_USER, SET_USER, VAL_ERROR } from "../../Constants/constants";
import { getCookiesData, removeCookiesData } from "../../Utils/cookies";

const { token, email } = getCookiesData()

const initialState = {
    error: '',
    token: token,
    email: email
}

export const userValidation = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                error:'',
                token: action.payload.token,
                email: action.payload.email   
            }
        case VAL_ERROR:
            return {
                ...state,
                token: '',
                email: '',
                error: action.payload
            }
        case REMOVE_USER:
            removeCookiesData()
            return{
                ...state,
                token: '',
                email: '',
                error: ''
            }
        default:
            return state
    }
}
