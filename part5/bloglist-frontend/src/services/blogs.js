import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(baseUrl, newObject, config)
    return res.data
}

const update = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return res.data
}

const deleteBlog = async (oldObject) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.delete(`${baseUrl}/${oldObject.id}`, config)
    return res.data
}

export { getAll, create, update, deleteBlog, setToken }