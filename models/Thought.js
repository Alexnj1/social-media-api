const { Schema, model } = require("mongoose");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Schema.Types.ObjectId(),
  },
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    validate: {
      validator: function (text) {
        if (text.length < 1 || text.length > 280) return false;
        else return true;
      },
      message:
        "Thought text is not a valid length, must be between 1 to 280 characters.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
});

ThoughtSchema.virtual("reaction-count", function () {
  return this.reactions.length;
});

const Thought = model("thought", ThoughtSchema);

module.exports = Thought;
