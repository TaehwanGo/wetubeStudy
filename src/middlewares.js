import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

// initialize s3 user kinda things
export const s3 = new aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env. AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2"
});

// const multerVideo = multer({dest: 'uploads/videos/'}); // dest : destination
const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "wetubetony/video"
    })
});
// const multerAvatar = multer({dest: "uploads/avatars/"}); // 추천하는 방법은 아님, 원래는 아마존에 올려야 함
const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "wetubetony/avatar"
    })
});

export const uploadVideo = multerVideo.single("videoFile"); // single.("videoFile") : 하나의 파일만 업로드 가능하고 // upload.pug에서 post로 전달되는 video file의 name의 key는 videoFile 이다.
export const uploadAvatar = multerAvatar.single("avatar"); // 

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null; // 이렇게 해야 우리 template들이 이 user에 접근 가능함 // login 상태가 아니라면 empty object 전달
    // console.log(res.locals.loggedUser, "res.locals.loggedUser"); // log out 상태에선 null 이 return 되므로 주의 할 것 !
    next(); //- 미들웨어가 next에 req를 전달해야 함, 이 경우 미들웨어가 커넥션과 라우트들 사이에 있으므로 next()를 반드시 추가
};

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.redirect(routes.home);
    }
}

