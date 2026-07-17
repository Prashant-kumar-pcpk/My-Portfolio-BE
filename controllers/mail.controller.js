const { sendMail } = require("../services/mail.service");

function getMailErrorMessage(err) {
  if (err.message && err.message.includes("App Password")) {
    return err.message;
  }

  if (err.code === "EAUTH" || err.responseCode === 535) {
    return "Gmail rejected the email credentials. Generate a Google App Password and put the 16-character code in EMAIL_PASS.";
  }

  return "Email could not be sent";
}

async function createMail(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    await sendMail(req.body);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: getMailErrorMessage(err),
    });
  }
}

module.exports = { createMail };
