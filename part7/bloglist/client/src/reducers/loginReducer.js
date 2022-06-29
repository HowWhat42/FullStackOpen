import { createSlice } from '@reduxjs/toolkit'
import { setToken } from '../services/blogs'
import { login } from '../services/login'

const blogSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            const user = action.payload
            setToken(user.token)
            return action.payload
        },
        logout(state, action) {
            window.localStorage.removeItem('loggedBlogappUser')
            return null
        },
    },
})

export const { setUser, logout } = blogSlice.actions

export const initializeUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const user = JSON.parse(loggedUserJSON)
    return async (dispatch) => {
        dispatch(setUser(user))
    }
}

export const loginUser = (username, password) => {
    return async (dispatch) => {
        const user = await login({ username, password })
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        dispatch(setUser(user))
    }
}

export default blogSlice.reducer
