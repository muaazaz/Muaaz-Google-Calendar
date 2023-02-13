export const SET_USER = 'Set_User'
export const REMOVE_USER = 'Remove_User'
export const LOG_IN = 'Login'
export const SIGN_UP = 'Signup'
export const VAL_ERROR = 'Validation_Error'
export const CREATE_EVENT = 'Create_Event'
export const EDIT_EVENT = 'Edit_Event'
export const GET_EVENTS = 'Get_Events'
export const GET_EVENT_DETAILS = 'Get_Event_Details'
export const SET_EVENTS = 'Set_Events'
export const SET_EVENT_DETAILS = 'Set_Event_Details'
export const DELETE_EVENT = 'Delete_Event'
export const UPDATE_EVENT = 'Update_Event'
const where = encodeURIComponent(
    JSON.stringify({
        name: {$exists: true,},
    })
);
export const apiUrl = `https://parseapi.back4app.com/classes/City?limit=1000&order=name&where=${where}`
export const headers = {
    "X-Parse-Application-Id": "q1QfxhDv1KLM5OPzUFzZRIvYERUAFLWEWX9r053J",
    "X-Parse-Master-Key": "POcTYBgrQ52WGn2lJrcQrYwFFM44uhQ2eqmoy8hS",
}
export const timeArray = ['9:00', '9:30', '10:00', '10:30', '11:00',
'11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
'3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00',
'6:30', '7:00', '7:30', '8:00']


