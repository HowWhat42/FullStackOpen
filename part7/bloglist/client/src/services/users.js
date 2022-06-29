import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export { getAll }
