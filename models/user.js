const { type } = require("express/lib/response");
const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "USER_ROLE",
    },
    google: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
