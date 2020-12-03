import express from "express";
import { deleteMovie, getCreateMovie, getEditMovie, home, movieDetail, postCreateMovie, postEditMovie, searchMovie } from "./movieController";

const movieRouter = express.Router();

// Add your magic here!
movieRouter.get("/", home);

movieRouter.get("/create", getCreateMovie);
movieRouter.post("/create", postCreateMovie);

movieRouter.get("/search", searchMovie); // yet

movieRouter.get("/:id", movieDetail);

movieRouter.get("/:id/edit", getEditMovie);
movieRouter.post("/:id/edit", postEditMovie);

movieRouter.get("/:id/delete", deleteMovie);


export default movieRouter;
