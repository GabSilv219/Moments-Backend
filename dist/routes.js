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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MomentController_1 = require("./controllers/MomentController");
const CommentController_1 = require("./controllers/CommentController");
const routes = (0, express_1.Router)();
//Moments Methods
routes.get("/:id", MomentController_1.getMoment);
routes.get("/", MomentController_1.getMoments);
routes.post("/", MomentController_1.upload.single('image'), MomentController_1.postMoment, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        return res.json({
            error: false,
            message: 'Upload Successfully!'
        });
    }
    return res.status(400).json({
        error: true,
        message: "Error: Upload Failed, Give proper files formate to upload"
    });
}));
routes.put("/:id", MomentController_1.upload.single('image'), MomentController_1.updateMoment, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        return res.json({
            error: false,
            message: 'Upload Successfully!'
        });
    }
    return res.status(400).json({
        error: true,
        message: "Error: Upload Failed, Give proper files formate to upload"
    });
}));
routes.delete("/:id", MomentController_1.deleteMoment);
//Comments Methods
routes.post("/create-comment/:momentId", CommentController_1.postComment);
exports.default = routes;
