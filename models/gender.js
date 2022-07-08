const { Schema, model } = require("mongoose");

const GenderSchema = Schema({
  gender: {
    type: String,
    required: [true, "gender is obligatory"],
  },
});

module.exports = model("Gender", GenderSchema);
