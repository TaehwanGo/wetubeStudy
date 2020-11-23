import express from "express";
import path from "path";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers";
import routes from "./routes";

const PORT = 4000; // 포트 

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); // 잘 모르겠는데 샌드박스에서 추가 된 것

// Add your magic here!
app.use(localsMiddleware); // 이게 아래 라우터들 다음에 온다면 라우터들은 이 localsMiddleware를 사용하지 못 함
app.use(routes.home, globalRouter);

// Codesanbox does not need PORT :)
const handleListening = () => console.log(`✅assignment6 Listening on: http://localhost${PORT}`);
app.listen(PORT, handleListening);
// app.listen(() => console.log(`Listening!`));
