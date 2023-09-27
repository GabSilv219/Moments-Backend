"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/models/Comment.ts
var Comment_exports = {};
__export(Comment_exports, {
  default: () => Comment_default
});
module.exports = __toCommonJS(Comment_exports);
var import_sequelize2 = require("sequelize");

// src/db/connection.ts
var import_sequelize = require("sequelize");
var sequelize = new import_sequelize.Sequelize("momentsApi", "gabsilv", "unicorn", {
  host: "127.0.0.1",
  dialect: "mysql"
});
var connection_default = sequelize;

// src/models/Comment.ts
var Comment = connection_default.define("comments", {
  username: {
    type: import_sequelize2.DataTypes.STRING
  },
  text: {
    type: import_sequelize2.DataTypes.STRING
  }
}, {
  createdAt: true,
  updatedAt: true
});
var Comment_default = Comment;
