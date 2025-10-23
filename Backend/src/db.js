// src/db.js
import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: { trustServerCertificate: true },
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

poolConnect
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch((err) => console.error("❌ Database connection failed:", err));

export { sql, poolConnect, pool };