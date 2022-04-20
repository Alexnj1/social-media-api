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
          { $push: { thoughts: data._id } },
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
  editThought({ body, params }, res) {
    Thought.findByIdAndUpdate({ _id: params.thought_id }, body, {
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
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(
      { _id: params.thought_id },
      { new: true, runValidators: true }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
  newReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thought_id },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
  deleteReaction({params}, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thought_id },
      { $pull: { reactions: {reactionId: params.reaction_id} } },
      { new: true, runValidators: true }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("There was a problem!");
      });
  },
};

module.exports = thoughtController;
