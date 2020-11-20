import express from "express";
import { edit, remove } from "../controllers";

const v2Router = express.Router();

v2Router.get("/remove", remove);
v2Router.get("/edit", edit);

export default v2Router;