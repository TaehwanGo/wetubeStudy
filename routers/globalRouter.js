import express from "express";
import passport from "passport";
import routes from "../routes";
import { getJoin, getLogin, githubLogin, logout, postGithubLogIn, postJoin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();


globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home); // controller에서 가져오는 export const home = (req, res) => res.send("Home");는 복잡해 질 수 있음
// 사용자 정보를 알아보기 위해 데이터베이스를 조회할 수도 있고, 에러인지 아닌지 알려줘야 할 수도 있다.
// 이렇게 코드를 컨트롤러와 라우터로 분리를 해야 할일이 커졌을 때 더 좋다
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
    routes.githubCallback, 
    passport.authenticate('github', { failureRedirect: '/login' }), 
    postGithubLogIn
);

export default globalRouter;