import { Request, Response } from 'express';
import Moment from '../models/Moment';
import Comment from '../models/Comment';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const getMoment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const moment = await Moment.findByPk(id, {include: {association: 'comments'}});

    if(moment) {
        return res.status(200).json(moment);
    } else {
      return res.status(401).json({message: "Moment Not Founded!"});
    }
  } catch (error) {
    return res.status(400).json({error});
  }
}

export const getMoments = async (req: Request, res: Response) => {
  try {
    const moment = await Moment.findAll({include: {association: 'comments'}});
    return res.status(200).json(moment);
  } catch (error) {
    return res.status(400).json({message: "Any Moments Founded!"});
  }
}

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

export const updateMoment = async (req: Request, res: Response) => {
  const  body  = {
    image: req.file?.filename,
    title: req.body.title,
    description: req.body.description
  }
  const { id } = req.params;

  try {
    const moment = await Moment.findByPk(id);
    if(moment) {
      await moment.update(body);
      return res.status(200).json({message: 'Moment Updated Successfully!'})
    } else {
      res.status(401).json({message: `moment ${id} Not Founded}`})
    }
  } catch (error) {
      console.log(error);
      return res.status(400).json({error});
  } 
}

export const deleteMoment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const moment = await Moment.findByPk(id);

    if(moment) {
      await moment.destroy();
      res.status(200).json({message: 'moment Deleted Successfully!'})
    } else {
      res.status(401).json({message: `moment ${id} Not Founded}`})
    } 
  } catch (error) {
    return res.status(400).json({error});
  }
}

//upload Image
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

// module.exports = {
//   getMoment,
//   getMoments,
//   postMoment,
//   updateMoment,
//   deleteMoment,
// }