import express from "express";
import { home, login, photos, profile } from "./controllers";
import routes from "./routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home); 
globalRouter.get(routes.login, login); 
globalRouter.get(routes.photos, photos); 
globalRouter.get(routes.profile, profile); 

export default globalRouter;