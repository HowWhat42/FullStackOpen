import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/users'

const blogSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
    },
})

export const { setUsers } = blogSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const blogs = await getAll()
        dispatch(setUsers(blogs))
    }
}

export default blogSlice.reducer
