const { Router } = require("express");
const { check } = require("express-validator");

const { emailExist, isValidGender } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");
const { login, googleSignIn, WhoAmI } = require("../controllers/auth");
const { usersPost } = require("../controllers/users");

const router = Router();

// Login with email and password
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

// Register with email and password
router.post(
  "/register",
  [
    (check("name", "name is required").not().isEmpty(),
    check("email", "email is not valid").isEmail(),
    check("email").custom(emailExist),
    check("password", "password must have more than 6 letters").isLength({
      min: 6,
    }),
    check("age", "age must be a number").isNumeric(),
    check("gender").custom(isValidGender),
    validateFields),
  ],
  usersPost
);

// Login with google
router.post(
  "/google",
  [
    check("id_token", "Google token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

router.get(
  "/whoami",
  [check("token", "Token is required").not().isEmpty()],
  WhoAmI
);

module.exports = router;
