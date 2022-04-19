const { getThoughts, newThought } = require('../../controllers/thought-controller')
const router = require('express').Router()

router
.route('/')
.get(getThoughts)

router
.route('/:user_id')
.post(newThought)

module.exports = router