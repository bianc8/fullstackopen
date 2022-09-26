import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let prevTimeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationWithoutTimeout(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    },
  }
})

export const { setNotificationWithoutTimeout, clearNotification } = notificationSlice.actions

/**
 * 
 * @param {String} notification notification to be shown
 * @param {Number} timeout seconds to wait before clearing the notification
 * @returns 
 */
export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(setNotificationWithoutTimeout(notification))
    clearTimeout(prevTimeoutId)
    prevTimeoutId = setTimeout(() => dispatch(clearNotification()), timeout*1000)
  }
}

export default notificationSlice.reducer