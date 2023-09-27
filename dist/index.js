"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/models/server.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/routes.ts
var import_express = require("express");

// src/models/Moment.ts
var import_sequelize3 = require("sequelize");

// src/db/connection.ts
var import_sequelize = require("sequelize");
var sequelize = new import_sequelize.Sequelize("momentsApi", "gabsilv", "unicorn", {
  host: "127.0.0.1",
  dialect: "mysql"
});
var connection_default = sequelize;

// src/models/Comment.ts
var import_sequelize2 = require("sequelize");
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

// src/models/Moment.ts
var Moment = connection_default.define("moments", {
  title: {
    type: import_sequelize3.DataTypes.STRING
  },
  description: {
    type: import_sequelize3.DataTypes.STRING
  },
  image: {
    type: import_sequelize3.DataTypes.STRING,
    defaultValue: import_sequelize3.DataTypes.NOW
  }
}, {
  createdAt: true,
  updatedAt: true
});
Moment.hasMany(Comment_default, { foreignKey: "momentId", as: "comments" });
var Moment_default = Moment;

// src/controllers/MomentController.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var getMoment = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  try {
    const moment = yield Moment_default.findByPk(id, { include: { association: "comments" } });
    if (moment) {
      return res.status(200).json(moment);
    } else {
      return res.status(401).json({ message: "Moment Not Founded!" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});
var getMoments = (req, res) => __async(void 0, null, function* () {
  try {
    const moment = yield Moment_default.findAll({ include: { association: "comments" } });
    return res.status(200).json(moment);
  } catch (error) {
    return res.status(400).json({ message: "Any Moments Founded!" });
  }
});
var postMoment = (req, res) => __async(void 0, null, function* () {
  var _a;
  const body = {
    image: (_a = req.file) == null ? void 0 : _a.filename,
    title: req.body.title,
    description: req.body.description
  };
  try {
    const moment = yield Moment_default.create(body);
    return res.status(200).json({ moment, message: "Moment Created Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});
var updateMoment = (req, res) => __async(void 0, null, function* () {
  var _a;
  const body = {
    image: (_a = req.file) == null ? void 0 : _a.filename,
    title: req.body.title,
    description: req.body.description
  };
  const { id } = req.params;
  try {
    const moment = yield Moment_default.findByPk(id);
    if (moment) {
      yield moment.update(body);
      return res.status(200).json({ message: "Moment Updated Successfully!" });
    } else {
      res.status(401).json({ message: `moment ${id} Not Founded}` });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});
var deleteMoment = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  try {
    const moment = yield Moment_default.findByPk(id);
    if (moment) {
      yield moment.destroy();
      res.status(200).json({ message: "moment Deleted Successfully!" });
    } else {
      res.status(401).json({ message: `moment ${id} Not Founded}` });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    if (!import_fs.default.existsSync(import_path.default.join(__dirname, "..", "uploads"))) {
      import_fs.default.mkdirSync(import_path.default.join(__dirname, "..", "uploads"));
    }
    console.log(import_path.default.resolve(__dirname, "uploads"));
    cb(null, import_path.default.resolve(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + import_path.default.extname(file.originalname));
  }
});
var upload = (0, import_multer.default)({
  storage,
  limits: { fileSize: 1e6 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|git/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(import_path.default.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(null, false);
  }
});

// src/controllers/CommentController.ts
var postComment = (req, res) => __async(void 0, null, function* () {
  const { username, text } = req.body;
  const { momentId } = req.params;
  try {
    const moment = yield Moment_default.findByPk(momentId);
    if (moment) {
      const comment = yield Comment_default.create({ username, text, momentId });
      return res.status(200).json({ comment, message: "Comment Posted Successfully!" });
    } else {
      return res.status(401).json({ message: "Any Moment Founded!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

// src/routes.ts
var routes = (0, import_express.Router)();
routes.get("/:id", getMoment);
routes.get("/", getMoments);
routes.post("/", upload.single("image"), postMoment, (req, res) => __async(void 0, null, function* () {
  if (req.file) {
    return res.json({
      error: false,
      message: "Upload Successfully!"
    });
  }
  return res.status(400).json({
    error: true,
    message: "Error: Upload Failed, Give proper files formate to upload"
  });
}));
routes.put("/:id", upload.single("image"), updateMoment, (req, res) => __async(void 0, null, function* () {
  if (req.file) {
    return res.json({
      error: false,
      message: "Upload Successfully!"
    });
  }
  return res.status(400).json({
    error: true,
    message: "Error: Upload Failed, Give proper files formate to upload"
  });
}));
routes.delete("/:id", deleteMoment);
routes.post("/create-comment/:momentId", postComment);
var routes_default = routes;

// src/models/server.ts
var import_dotenv = __toESM(require("dotenv"));
var import_path2 = __toESM(require("path"));
import_dotenv.default.config();
var Server = class {
  constructor() {
    this.app = (0, import_express2.default)();
    this.port = process.env.API_PORT || "3001";
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Application Running on Port: ${this.port}`);
    });
  }
  routes() {
    this.app.get("/", (req, res) => {
      res.json({
        msg: "API Working"
      });
    });
    this.app.use("/api/moments", routes_default);
  }
  midlewares() {
    this.app.use(import_express2.default.json());
    this.app.use((0, import_cors.default)());
    this.app.use("/uploads", import_express2.default.static(import_path2.default.resolve(__dirname, "..", "uploads")));
  }
  dbConnect() {
    return __async(this, null, function* () {
      try {
        yield connection_default.authenticate();
        console.log("Database Connected!");
      } catch (error) {
        console.log(error);
        console.log("Error trying to connect in database!");
      }
    });
  }
};
var server_default = Server;

// src/index.ts
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
var server = new server_default();
