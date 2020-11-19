import express from "express";

export const userRouter = express.Router();

// router는 많은 route들이 담긴 파일이다
userRouter.get("/", (req, res) => res.send('user index')); // anonymous function
userRouter.get("/edit", (req, res) => res.send('user edit'));
userRouter.get("/password", (req, res) => res.send('user password'));
// 이것들 export 한 다음에 해도 되는건가?
