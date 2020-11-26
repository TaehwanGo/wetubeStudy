import express from "express";
import path from "path";
import "./db";
import movieRouter from "./movieRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(localsMiddleware);
app.use("/", movieRouter);

// port 설정
const PORT = 4000;
const handleListening = () => console.log(`✅ Listening on: http://localhost${PORT}`);
app.listen(PORT, handleListening);

// Codesanbox does not need PORT :)
// app.listen(() => console.log(`✅  Server Ready!`));
