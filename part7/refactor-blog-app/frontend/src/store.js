import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: usersReducer,
    login: loginReducer,
    notification: notificationReducer
  }
})

export default store