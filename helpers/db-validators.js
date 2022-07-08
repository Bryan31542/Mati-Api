const Role = require("../models/role");
const User = require("../models/user");
const Gender = require("../models/gender");

// check if the role exist in the database
const isValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`the role ${role} is not registered in the database`);
  }
};

// check if the email exist in the database
const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`Email: ${email} already exist in the database`);
  }
};

// check if the gender given is in th`e database
const isValidGender = async (gender = "") => {
  const genderExist = await Gender.findOne({ gender });

  if (!genderExist) {
    throw new Error(`The gender ${gender} is not registered in the database`);
  }
};

// check if the user exists by the id sent
const userExistByID = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`ID: ${id} does not exist in the database`);
  }
};

module.exports = { isValidRole, emailExist, isValidGender, userExistByID };
