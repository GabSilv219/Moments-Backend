import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Moment from '../models/Moment'

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