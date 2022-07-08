const { Router } = require("express");
const { search } = require("../controllers/search");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

// Get the users that match the search query
router.get("/:term", [validateJWT, validateFields], search);

module.exports = router;
