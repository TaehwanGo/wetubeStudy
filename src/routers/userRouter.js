import express from "express";
import routes from "../routes";
import {
    userDetail,
    getEditProfile,
    postEditProfile,
    getChangePassword,
    postChangePassword
  } from "../controllers/userController";
import { onlyPrivate, onlyPublic, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

// router는 많은 route들이 담긴 파일이다
// userRouter.get("/", (req, res) => res.send('user index')); // anonymous function
// userRouter.get("/edit", (req, res) => res.send('user edit'));
// userRouter.get("/password", (req, res) => res.send('user password')); // 이것들 export 한 다음에 해도 되는건가? 됨(변수하나라서)

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile); // uploadAvatar는 multer(middlewares.js)로 부터 옴

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;