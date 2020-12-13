import express from "express";
import routes from "../routes";
import { postAddComment, postDeleteComment, postRegisterView } from "../controllers/videoController";
import { checkLogin } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.deleteComment, postDeleteComment); // URL에 :id가 없으므로 앞에 위치해야 됨
apiRouter.post(routes.registerView, postRegisterView); // db를 변경할 필요가 없으면 getRequest이어야 함
apiRouter.post(routes.addComment, postAddComment);
apiRouter.get(routes.checkLogin, checkLogin); // get방식은 send가 안되나?

export default apiRouter;