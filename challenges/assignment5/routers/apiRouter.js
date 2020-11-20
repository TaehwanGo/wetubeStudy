import express from "express";
import { apiDocument } from "../controllers";
import v1Router from "./v1Router";
import v2Router from "./v2Router";

const apiRouter = express.Router();

apiRouter.get("/documentation", apiDocument);
apiRouter.use("/v1", v1Router); // get을 쓰면 안됨 // use를 써야 router 전체를 사용하겠다는 의미
apiRouter.use("/v2", v2Router);

export default apiRouter;