const {User} = require('../models')

const userController = {
    getUsers(req,res) {
        User.find({})
        .then((userData) => {
            res.status(200).json(userData)
        })
        .catch((err) => {
            throw new Error('There was a problem!')
        })
    }
}

module.exports = userController