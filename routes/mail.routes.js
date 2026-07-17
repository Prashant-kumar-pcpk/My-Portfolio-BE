const express = require("express");
const router = express.Router();
const { createMail } = require("../controllers/mail.controller");

router.post("/", createMail);

module.exports = router;
