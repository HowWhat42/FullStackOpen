import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNofitication(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})

export const { setNofitication, clearNotification } = notificationSlice.actions

let timeoutID

export const setNotification = (notif, time) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        dispatch(setNofitication(notif))
        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}
export default notificationSlice.reducer