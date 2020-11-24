import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;
    res.locals.user = { // 임시 데이터, 나중에 DB에 직접 데이터를 저장하고 authentication을 만들 예정 
        isAuthenticated: true,
        id: 1
    }
    next(); //- 미들웨어가 next에 req를 전달해야 함, 이 경우 미들웨어가 커넥션과 라우트들 사이에 있으므로 next()를 반드시 추가
}