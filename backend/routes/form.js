const express = require("express");
const router = express.Router();

const { postCreateUser } = require("../controller/form");

router.post("/", postCreateUser);

module.exports = router;
