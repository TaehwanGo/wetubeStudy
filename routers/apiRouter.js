import express from "express";
import routes from "../routes";
import { postAddComment, postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView); // db를 변경할 필요가 없으면 getRequest이어야 함
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;