import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Sexy Site";
    res.locals.routes = routes;
    next(); //- 미들웨어가 next에 req를 전달해야 함, 이 경우 미들웨어가 커넥션과 라우트들 사이에 있으므로 next()를 반드시 추가
}