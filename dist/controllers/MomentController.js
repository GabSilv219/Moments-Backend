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
exports.upload = exports.storage = exports.deleteMoment = exports.updateMoment = exports.postMoment = exports.getMoments = exports.getMoment = void 0;
const Moment_1 = __importDefault(require("../models/Moment"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getMoment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const moment = yield Moment_1.default.findByPk(id, { include: { association: 'comments' } });
        if (moment) {
            return res.status(200).json(moment);
        }
        else {
            return res.status(401).json({ message: "Moment Not Founded!" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.getMoment = getMoment;
const getMoments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moment = yield Moment_1.default.findAll({ include: { association: 'comments' } });
        return res.status(200).json(moment);
    }
    catch (error) {
        return res.status(400).json({ message: "Any Moments Founded!" });
    }
});
exports.getMoments = getMoments;
const postMoment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = {
        image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
        title: req.body.title,
        description: req.body.description
    };
    try {
        const moment = yield Moment_1.default.create(body);
        return res.status(200).json({ moment, message: 'Moment Created Successfully!' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});
exports.postMoment = postMoment;
const updateMoment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const body = {
        image: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename,
        title: req.body.title,
        description: req.body.description
    };
    const { id } = req.params;
    try {
        const moment = yield Moment_1.default.findByPk(id);
        if (moment) {
            yield moment.update(body);
            return res.status(200).json({ message: 'Moment Updated Successfully!' });
        }
        else {
            res.status(401).json({ message: `moment ${id} Not Founded}` });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});
exports.updateMoment = updateMoment;
const deleteMoment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const moment = yield Moment_1.default.findByPk(id);
        if (moment) {
            yield moment.destroy();
            res.status(200).json({ message: 'moment Deleted Successfully!' });
        }
        else {
            res.status(401).json({ message: `moment ${id} Not Founded}` });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.deleteMoment = deleteMoment;
//upload Image
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, '..', 'uploads'))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, '..', 'uploads'));
        }
        console.log(path_1.default.resolve(__dirname, 'uploads'));
        cb(null, path_1.default.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({
    storage: exports.storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|git/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path_1.default.extname(file.originalname));
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(null, false);
    }
});
// module.exports = {
//   getMoment,
//   getMoments,
//   postMoment,
//   updateMoment,
//   deleteMoment,
// }
