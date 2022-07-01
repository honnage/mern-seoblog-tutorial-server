const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth");

// validators
const { runValidation } = require("../vaildators");
const { userSingupValidator } = require("../vaildators/auth");

router.post("/signup",  userSingupValidator, runValidation, signup);

module.exports = router;
