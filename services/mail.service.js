const nodemailer = require("nodemailer");

function normalizeAppPassword(pass) {
  return pass.trim().replace(/\s+/g, "");
}

function getMailConfig() {
  const user = process.env.EMAIL_USER && process.env.EMAIL_USER.trim();
  const pass =
    process.env.EMAIL_PASS && normalizeAppPassword(process.env.EMAIL_PASS);

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASS are required");
  }

  if (!/^[a-zA-Z0-9]{16}$/.test(pass)) {
    throw new Error(
      "Gmail requires a 16-character App Password in EMAIL_PASS, not your normal Google password"
    );
  }

  return { user, pass };
}

async function sendMail({ name, email, subject, message }) {
  const { user, pass } = getMailConfig();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  return transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    replyTo: email,
    to: user,
    subject: subject || "New Contact Form Message",
    html: `
      <h3>New Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  });
}

module.exports = { sendMail };
