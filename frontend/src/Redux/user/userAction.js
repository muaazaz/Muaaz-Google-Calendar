import { LOG_IN, REMOVE_USER, SIGN_UP } from "../../Constants/constants"

export const signUp = (payload)=>{
    return({
        type: SIGN_UP,
        payload
    })
}

export const logIn = (payload)=>{
    return({
        type: LOG_IN,
        payload
    })
}

export const logOut = ()=>{
    return({
        type: REMOVE_USER
    })
}
