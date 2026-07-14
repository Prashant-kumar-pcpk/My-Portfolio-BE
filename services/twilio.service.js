const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

async function sendSMS(to, from, body) {
  return client.messages.create({ to, from, body });
}

module.exports = { sendSMS };
