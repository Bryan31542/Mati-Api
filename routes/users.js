const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
  hasRole,
  isAdmin,
} = require("../middlewares");

const {
  emailExist,
  isValidGender,
  userExistByID,
} = require("../helpers/db-validators");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersGetOne,
  usersFollow,
} = require("../controllers/users");

const router = Router();

// Get all users from the database
router.get("/", [validateJWT, validateFields], usersGet);

// Get one user from the database, by ID
router.get("/:id", [validateJWT, validateFields], usersGetOne);

// Update one user from the database, by ID
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "is not a valid ID").isMongoId(),
    check("id").custom(userExistByID),
    validateFields,
  ],
  usersPut
);

// Create a new user in the database, only admins has permission to do this
router.post(
  "/",
  [
    validateJWT,
    isAdmin,
    check("name", "name is required").not().isEmpty(),
    check("email", "email is not valid").isEmail(),
    check("email").custom(emailExist),
    check("password", "password must have more than 6 letters").isLength({
      min: 6,
    }),
    check("age", "age must be a number").isNumeric(),
    check("gender").custom(isValidGender),
    validateFields,
  ],
  usersPost
);

// Delete an user, only admins has permission to do this
router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    check("id", "is not a valid ID").isMongoId(),
    check("id").custom(userExistByID),
    validateFields,
  ],
  usersDelete
);

// Follow an user
router.post(
  "/follows/:id",
  [validateJWT, check("id", "is not a valid ID").isMongoId(), validateFields],
  usersFollow
);

module.exports = router;
