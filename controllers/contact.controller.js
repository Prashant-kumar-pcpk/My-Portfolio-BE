const Contact = require("../models/contact.model");
const { sendSMS } = require("../services/twilio.service");

async function createContact(req, res) {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const contact = await Contact.create({ name, email, phone });

    if (process.env.OWNER_PHONE && process.env.TWILIO_FROM) {
      try {
        await sendSMS(
          process.env.OWNER_PHONE,
          process.env.TWILIO_FROM,
          `New contact from ${name} (${phone} / ${email})`
        );
      } catch (smsError) {
        console.warn("Contact saved, but SMS notification failed:", smsError.message);
      }
    }

    return res.status(200).json({
      message: "Contact saved",
      id: contact._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createContact };
