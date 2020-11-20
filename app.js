import express from "express"; // index.js를 app.js와 init.js로 분리
import morgan from "morgan"; 
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import { userRouter } from "./routers/userRouter";
import { localsMiddleware } from "./middlewares"; // 알파벳 순서로 정렬하는게 나중에 보기 편함 
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set('view engine', "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));

// locals 미들웨어 : local변수를 global변수로 사용하도록 만들어주는 것
// app.use((req, res, next) => ) 
// const localsMiddleware = (req, res, next) => {

// }
app.use(localsMiddleware); // 이게 아래 라우터들 다음에 온다면 라우터들은 이 localsMiddleware를 사용하지 못 함

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // 하나의 함수를 쓰는 대신 라우터를 쓰면 여러 route를 가질 수 있음 // get에서 use로 변경 // 만약 app.get 이라면? /user/edit 경로를 찾을 수 없음
app.use(routes.videos, videoRouter);

export default app;