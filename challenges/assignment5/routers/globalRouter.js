import express from "express";
import { confirmAccount, home, join, login } from "../controllers";

const globalRouter = express.Router();

globalRouter.get("/",home);
globalRouter.get("/join",join);
globalRouter.get("/login",login);
globalRouter.get("/confirm-account", confirmAccount);

export default globalRouter;