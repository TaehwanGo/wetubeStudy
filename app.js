import express from "express"; // index.js를 app.js와 init.js로 분리
import morgan from "morgan"; 
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import { userRouter } from "./routers/userRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // 하나의 함수를 쓰는 대신 라우터를 쓰면 여러 route를 가질 수 있음 // get에서 use로 변경 // 만약 app.get 이라면? /user/edit 경로를 찾을 수 없음
app.use(routes.videos, videoRouter);

export default app;