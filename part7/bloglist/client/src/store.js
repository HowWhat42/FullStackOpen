import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/loginReducer'
import blogsReducer from './reducers/blogsReducer'
import nofiticationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

export default configureStore({
    reducer: {
        login: loginReducer,
        notification: nofiticationReducer,
        blogs: blogsReducer,
        users: usersReducer,
    },
})
