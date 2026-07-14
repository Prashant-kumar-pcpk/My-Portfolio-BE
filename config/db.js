require("dotenv").config();
const mssql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
};

let pool;

async function getPool() {
  if (!pool) {
    pool = await mssql.connect(dbConfig);
    console.log("✅ MSSQL Connected");
  }
  return pool;
}

module.exports = { getPool, mssql };
