"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Comment_1 = __importDefault(require("./Comment"));
const Moment = connection_1.default.define('moments', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    stock: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    createdAt: true,
    updatedAt: true
});
Moment.hasMany(Comment_1.default, { foreignKey: 'momentId', as: 'comments' });
exports.default = Moment;
