const { Thought, User } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },

  // creates a new thought and simultaneously pushes it to user model
  newThought({ params, body }, res) {
    Thought.create(body)
      .then((data) => {
        return User.findByIdAndUpdate(
          { _id: params.user_id },
          {$push: {thoughts: data._id}},
          {
            runValidators: true,
            new: true,
          }
        );
      })
      .then((result) => {
        res.status(200).json(result); 
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
};

module.exports = thoughtController;
