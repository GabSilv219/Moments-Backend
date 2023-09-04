# Moments-Backend

You can find the frontend repository [Here](https://github.com/GabSilv219/CRUD_products-Frontend/tree/master)
> Status: Done ✅

## 🔨 Tools and Libs used in this project:
* [NodeJS](https://nodejs.org/en)
* [Express](https://expressjs.com/pt-br/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Typescript](https://www.typescriptlang.org/)
* [Sequelize](https://sequelize.org/docs/v6/getting-started/)
* [MySQL](https://www.mysql.com/)
* [Cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
* [Multer](https://www.npmjs.com/package/multer)

## Table and Entities
### Moment
```
id: INTEGER
title: STRING,
description: STRING,
image: STRING,
```
### Comment
```
id: INTEGER
username: STRING,
text: STRING,
momentId: INTEGER
References: {model: 'moments', key: 'id'},
```

## CRUD Methods
> ## Moment
### Get all moments/comments
~~~
export const getMoments = async (req: Request, res: Response) => {
  try {
    const moment = await Moment.findAll({include: {association: 'comments'}});
    return res.status(200).json(moment);
  } catch (error) {
    return res.status(400).json({message: "Any Moments Founded!"});
  }
}
~~~
### Post
~~~
export const postMoment = async (req: Request, res: Response) => {
  const  body  = {
    image: req.file?.filename,
    title: req.body.title,
    description: req.body.description
  }
  try {
      const moment = await Moment.create(body);
      return res.status(200).json({moment, message: 'Moment Created Successfully!'});
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
}
~~~
## Upload Function from Multer
~~~
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(!fs.existsSync(path.join(__dirname, '..', 'uploads'))){
      fs.mkdirSync(path.join(__dirname, '..', 'uploads'));
    }

    console.log(path.resolve(__dirname, 'uploads'));
    cb(null, path.resolve(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png|git/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimeType && extname){
      return cb(null, true)
    }
    cb(null, false);
  }
})
~~~
> ## Comment
### Post
~~~
export const postComment = async (req: Request, res: Response) => {
  const { username, text } = req.body;
  const { momentId } = req.params;
  try {
      const moment = await Moment.findByPk(momentId);
      if(moment) {
        const comment = await Comment.create({username, text, momentId});
        return res.status(200).json({comment, message: 'Comment Posted Successfully!'});
      } else {
        return res.status(401).json({message: 'Any Moment Founded!'});
      }
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
}
~~~
## Association
~~~
Moment.hasMany(Comment, {foreignKey: 'momentId', as: 'comments'});
~~~

## Routes
~~~
import { Request, Response, Router } from 'express';
import { getMoment, getMoments, postMoment, updateMoment, deleteMoment, upload } from './controllers/MomentController';
import { postComment } from './controllers/CommentController';

const routes = Router();

//Moments Methods
routes.get("/:id", getMoment);
routes.get("/", getMoments);
routes.post("/", upload.single('image'), postMoment ,async (req: Request, res: Response) => {
  if(req.file){
      return res.json({
        error: false,
        message: 'Upload Successfully!'
      });
  }

  return res.status(400).json({
    error: true,
    message: "Error: Upload Failed, Give proper files formate to upload"
  })
})

routes.put("/:id", upload.single('image'), updateMoment, async (req: Request, res: Response) => {
  if(req.file){
      return res.json({
        error: false,
        message: 'Upload Successfully!'
      });
  }

  return res.status(400).json({
    error: true,
    message: "Error: Upload Failed, Give proper files formate to upload"
  })
});

routes.delete("/:id", deleteMoment);

//Comments Methods
routes.post("/create-comment/:momentId", postComment); 

export default routes;
~~~
