"use strict";
const dotenv = require("dotenv");

dotenv.config();

// src/config/database.js
module.exports = {
  dialect: "postgres",
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  define: {
    timestamps: true,
    underscored: true
  }
};
