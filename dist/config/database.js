"use strict";

// src/config/database.js
module.exports = {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  database: "momentsApi",
  username: "gabsilv",
  password: "unicorn",
  define: {
    timestamps: true,
    underscored: true
  }
};
