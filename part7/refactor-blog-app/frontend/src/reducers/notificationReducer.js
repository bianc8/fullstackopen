import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: ''
}
let prevTimeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationWithoutTimeout(state, action) {
      state = action.payload
      return state
    },
    clearNotification(state, action) {
      state = initialState
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
export const setNotification = (message, type, timeout) => {
  return async dispatch => {
    dispatch(setNotificationWithoutTimeout({ message, type }))
    clearTimeout(prevTimeoutId)
    prevTimeoutId = setTimeout(() => dispatch(clearNotification()), timeout*1000)
  }
}

export default notificationSlice.reducer