const express = require("express");
const router = express.Router();
const { getPool, mssql } = require("../config/db");
const { sendSMS } = require("../services/twilio.service");

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const pool = await getPool();

    const result = await pool
      .request()
      .input("name", mssql.NVarChar(200), name)
      .input("email", mssql.NVarChar(200), email)
      .input("phone", mssql.NVarChar(50), phone)
      .input("createdAt", mssql.DateTime, new Date())
      .query(`
        INSERT INTO Contacts (Name, Email, Phone, CreatedAt)
        VALUES (@name, @email, @phone, @createdAt);
        SELECT SCOPE_IDENTITY() AS Id;
      `);

    const id = result.recordset[0].Id;

    if (process.env.OWNER_PHONE && process.env.TWILIO_FROM) {
      await sendSMS(
        process.env.OWNER_PHONE,
        process.env.TWILIO_FROM,
        `New contact from ${name} (${phone} / ${email})`
      );
    }

    res.status(200).json({ message: "Contact saved", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
