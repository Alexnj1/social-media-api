const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please enter a valid email!",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "friends",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friend-count", function () {
  return this.friends.length;
});

const User = model("user", UserSchema);

module.exports = User;
