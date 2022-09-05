const express = require('express')
const router = express.Router()
const redis = ('../redis')

router.get('/', async(req, res) => {
    const counter = await redis.getAsync('todoCount')
    res.send({ added_todos: counter })
})

module.exports = router