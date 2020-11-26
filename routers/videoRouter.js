import express from "express";
import routes from "../routes";
import {
    videoDetail,
    deleteVideo,
    getUpload,
    postUpload,
    getEditVideo,
    postEditVideo
  } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// console.log(routes.editVideo()); // routes.editVideo는 이제 function이고 editVideo()로 찍으면 파라미터로 나옴

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;