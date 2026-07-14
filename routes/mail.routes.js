const express = require("express");
const router = express.Router();
const { sendMail } = require("../services/mail.service");

router.post("/", async (req, res) => {
  try {
    await sendMail(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

module.exports = router;
