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

// src/controllers/CommentController.ts
var CommentController_exports = {};
__export(CommentController_exports, {
  postComment: () => postComment
});
module.exports = __toCommonJS(CommentController_exports);

// src/models/Comment.ts
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

// src/models/Moment.ts
var import_sequelize3 = require("sequelize");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postComment
});
