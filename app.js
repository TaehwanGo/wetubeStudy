import express from "express"; // index.js를 app.js와 init.js로 분리
import morgan from "morgan"; 
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => res.send("Hello from home");

const handleProfile = (req, res) => res.send("you are on my profile"); 

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.use("/user", userRouter); // 하나의 함수를 쓰는 대신 라우터를 쓰면 여러 route를 가질 수 있음 // get에서 use로 변경
// 만약 app.get 이라면? /user/edit 경로를 찾을 수 없음

export default app;