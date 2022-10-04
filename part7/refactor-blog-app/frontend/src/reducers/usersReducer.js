import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'

const initialState = []
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    appendUser(state, action){
      state.push(action.payload)
    },
    updateUser(state, action) {
      const id = action.payload.id
      return state.map(a => a.id !== id ? a : action.payload.newUser)
    },
    setUsers(state, action) {
      state = action.payload
      return action.payload
    },
    clearUsers(state, action) {
      state = initialState
      return state
    }
  }
})
export const { appendUser, updateUser, setUsers, clearUsers } = usersSlice.actions

// missing initializeUsers
export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}
// missing createUser

export default usersSlice.reducer