import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateOne } from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            const changedAnecdote = action.payload
            return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
        },
        appendAnecdotes(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { updateAnecdote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdote = await createNew(content)
        dispatch(appendAnecdotes(anecdote))
    }
}

export const voteAnecdote = (anecdoteToChange) => {
    return async dispatch => {
        const anecdote = await updateOne(anecdoteToChange.id, {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
        })
        dispatch(updateAnecdote(anecdote))
    }
}

export default anecdoteSlice.reducer