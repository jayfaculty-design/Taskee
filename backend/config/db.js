const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "taskee",
  password: process.env.PG_PASSWORD || "facultyf",
  port: process.env.PG_PORT || 5432,
});

module.exports = pool;
