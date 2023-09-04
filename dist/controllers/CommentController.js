"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const Moment_1 = __importDefault(require("../models/Moment"));
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, text } = req.body;
    const { momentId } = req.params;
    try {
        const moment = yield Moment_1.default.findByPk(momentId);
        if (moment) {
            const comment = yield Comment_1.default.create({ username, text, momentId });
            return res.status(200).json({ comment, message: 'Comment Posted Successfully!' });
        }
        else {
            return res.status(401).json({ message: 'Any Moment Founded!' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});
exports.postComment = postComment;
