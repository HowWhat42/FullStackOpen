import { createSlice } from '@reduxjs/toolkit'
import { getAll, create, update, postComment, deleteBlog } from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            const changedBlog = action.payload
            return state.map((b) => (b.id !== changedBlog.id ? b : changedBlog))
        },
        removeBlog(state, action) {
            const deletedBlog = action.payload
            return state.filter((b) => b.id !== deletedBlog.id)
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { appendBlogs, updateBlog, removeBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (title, author, url) => {
    return async (dispatch) => {
        const blog = await create({ title, author, url })
        dispatch(appendBlogs(blog))
    }
}

export const like = (blogToChange) => {
    return async (dispatch) => {
        const blog = await update({
            ...blogToChange,
            likes: blogToChange.likes + 1,
        })
        dispatch(updateBlog(blog))
    }
}

export const commentBlog = (blogToChange, newComment) => {
    return async (dispatch) => {
        const blog = await postComment({
            ...blogToChange,
            comments: [...blogToChange.comments, newComment],
        })
        dispatch(updateBlog(blog))
    }
}

export const deleteOne = (blogToDelete) => {
    return async (dispatch) => {
        await deleteBlog(blogToDelete)
        dispatch(removeBlog(blogToDelete))
    }
}

export default blogSlice.reducer
