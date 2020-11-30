import express from "express";
import routes from "../routes";
import { getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();


globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home); // controller에서 가져오는 export const home = (req, res) => res.send("Home");는 복잡해 질 수 있음
// 사용자 정보를 알아보기 위해 데이터베이스를 조회할 수도 있고, 에러인지 아닌지 알려줘야 할 수도 있다.
// 이렇게 코드를 컨트롤러와 라우터로 분리를 해야 할일이 커졌을 때 더 좋다
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;