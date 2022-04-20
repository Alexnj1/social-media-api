const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../helpers/date')

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    validate: {
      validator: function (text) {
        if (text.length > 280) return false;
        else return true;
      },
      message: "Reaction must be 280 characters or less!",
    },
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => dateFormat(date)
  },
},
{
    toJSON: {
        getters: true
    },
    id: false
});

const ThoughtSchema = new Schema(
  {
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
      get: (date) => dateFormat(date)
    },
    username: {
      type: String,
      required: true,
      ref: 'user'
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

ThoughtSchema.virtual("reaction-count").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", ThoughtSchema);

module.exports = Thought;
