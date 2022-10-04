import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import loginService from '../services/login'

import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'logins',
  initialState: null,
  reducers: {
    clearLogin(state, action) {
      setNotification(`logged out`, 'error', 5)
      userService.clearUser()
      state = null
      return state
    },
    setUser(state, action) {
      state = action.payload
      return state
    },
    getUser(state, action) {
      return state.name
    }
  }
})
export const { clearLogin, setUser, getUser } = loginSlice.actions

export const initializeLogin = () => {
  return async dispatch => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
      dispatch(setNotification(`${userFromStorage.name} logged in!`, 'success', 5))
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    loginService
      .login({ username, password })
      .then(user => {
        dispatch(setUser(user))
        userService.setUser(user)
        dispatch(setNotification(`${user.name} logged in!`, 'success', 5))
      })
      .catch((e) => {
        dispatch(setNotification(`Invalid username/password!`, 'error', 5))
      })
  }
}

export const logout = () => {
  return async dispatch => {
    const user = userService.getUser()
    if (user !== undefined) {
      dispatch(setNotification(`${user.name} logged out!`, 'error', 5))
      dispatch(clearLogin())
    }
  }
}

export default loginSlice.reducer