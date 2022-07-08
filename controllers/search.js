const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const User = require("../models/user");

const search = async (req, res = response) => {
  // getting the term that was sent
  const { term } = req.params;

  // in case the term was an id we will check if it a mongo id
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  // if the term was not a mongo id, can be a the name or email of the user
  // so we will be case insensitive
  const regex = new RegExp(term, "i");

  // searching for the user by the name or email
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  // sending the response, would be an empty array if the user was not found
  return res.json({ results: users });
};

module.exports = {
  search,
};
