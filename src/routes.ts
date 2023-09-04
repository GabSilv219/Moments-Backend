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