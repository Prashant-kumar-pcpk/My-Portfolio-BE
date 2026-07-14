require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact.routes");
const mailRoutes = require("./routes/mail.routes");


const app = express();
app.use(cors());
app.use(express.json()); // parse JSON


// for testing backend server is running---------
app.get( "/", async(req,res) => {
  res.send("Hey this server is running.")
});

// Routes
app.use("/contact", contactRoutes);
app.use("/sendmail", mailRoutes);


const PORT = 8088; // or 4000, 8080 etc.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});