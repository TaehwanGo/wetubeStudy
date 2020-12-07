import express from "express"; // index.js를 app.js와 init.js로 분리
import morgan from "morgan"; 
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
// import { userRouter } from "./routers/userRouter";
import { localsMiddleware } from "./middlewares"; // 알파벳 순서로 정렬하는게 나중에 보기 편함 
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet(
    {
        contentSecurityPolicy: false
    }
));
app.set('view engine', "pug");
app.use("/uploads", express.static("uploads")); // uploads에 있는 file을 전달하는 middleware
app.use("/static", express.static("static")); 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({mongooseConnection: mongoose.connection})
    })
);  // passport가 스스로 쿠키를 들여다 봐서, 그 쿠키정보에 해당하는 사용자를 찾아줌
app.use(passport.initialize()); // 위에서 실행된 cookieParser로 부터 쿠키가 쭉 여기까지 내려와서 passport는 초기화되고 
app.use(passport.session());

// passport는 자기가 찾은 그 사용자를 req object에 담고 middleware.js에서 전역변수로 만듦
app.use(localsMiddleware); // 이게 아래 라우터들 다음에 온다면 라우터들은 이 localsMiddleware를 사용하지 못 함

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // 하나의 함수를 쓰는 대신 라우터를 쓰면 여러 route를 가질 수 있음 // get에서 use로 변경 // 만약 app.get 이라면? /user/edit 경로를 찾을 수 없음
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;