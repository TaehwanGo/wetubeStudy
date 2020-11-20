import express from "express";
import { courses, coursesMine, coursesNew } from "../controllers";

const coursesRouter = express.Router();

coursesRouter.get("/", courses);
coursesRouter.get("/new", coursesNew);
coursesRouter.get("/mine", coursesMine);

export default coursesRouter;