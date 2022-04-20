const router = require('express').Router()
const {getUsers, newUser, editUser, getUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller')

router
.route('/')
.get(getUsers)
.post(newUser)

router.route('/:id')
.get(getUser)
.put(editUser)
.delete(deleteUser)

router
.route('/:user_id/:friend_id')
.put(addFriend)
.delete(removeFriend)

module.exports = router