const { User } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find({})
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
  getUser({ params }, res) {
    User.find({ _id: params.id })
      .then((userData) => {
        res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
  newUser({ body }, res) {
    User.create(body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
  addFriend({params}, res) {

    // this method adds two people to each other's friend list simultaneously

    User.findOneAndUpdate(
      { _id: params.user_id },
      { $push: { friends: params.friend_id } },
      { new: true, runValidators: true }
    ).then((userData) => {
        if(!userData){
            res.status(400).json('No user found with this id!');
            return
        }
        return User.findOneAndUpdate(
            // reverse the friend and user ids from previous query
            { _id: params.friend_id },
            { $push: { friends: params.user_id } },
            { new: true, runValidators: true }
        )
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
  editUser({ body, params }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, {
      runValidators: true,
      new: true,
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
  deleteUser({ params }, res) {
    User.findByIdAndDelete({ _id: params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
};

module.exports = userController;
