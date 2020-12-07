import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView); // db를 변경할 필요가 없으면 getRequest이어야 함
// db를 변경해야 된다면 post 방식이어야 됨 // 왜? 

export default apiRouter;