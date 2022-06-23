import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const getAll = async() => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createNew = async(content) => {
    const res = await axios.post(baseUrl, asObject(content))
    return res.data
}

export const updateOne = async(id, content) => {
    const res = await axios.put(`${baseUrl}/${id}`, content)
    return res.data
}