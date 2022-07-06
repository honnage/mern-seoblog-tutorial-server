const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth");

// validators
const { runValidation } = require("../vaildators");
const { userSingupValidator, userSinginValidator } = require("../vaildators/auth");

router.post("/signup",  userSingupValidator, runValidation, signup);
router.post("/signin",  userSinginValidator, runValidation, signin);

module.exports = router;
