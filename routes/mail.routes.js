const express = require("express");
const router = express.Router();
const { createMail } = require("../controllers/mail.controller");
// const { SendMail } = require("../controllers/sendMailController");

router.post("/", createMail);

module.exports = router;
