// import {videos} from "../db"; // 더 이상 controller에서 import하는게 아닌 init.js에서 import 해서 사용 할 것임
import routes from "../routes"
import Video from "../models/Video"; // 이건 단지 model 이고 dattabase의 element가 아님 

export const home = async (req, res) => { // async가 없다면 videos를 발견 못 하면 그냥 render 함
    try{ // 기다리긴 하지만 error가 발생한 경우도 success로 간주하여 render로 넘어가기 때문에 try catch를 적용 
        const videos = await Video.find({}); // 이 find은 모든, 어떤 video든 가져올 것임, await은 오직 async function안에서만 가능함
        res.render("home", {pageTitle:'Home', videos}); // res.send("Home") 대신 html을 보내기 위해 render로 수정, /views가 default 폴더이기 때문에 따로 import하지 않아도 자동으로 찾아서 전송함
    } catch(error) {
        console.log(error);
        res.render("home", {pageTitle:'Home', videos});
    }
    // console.log(videos);
    // home화면에 비디오 목록을 띄울 것 임
}
export const search = (req, res) => {
    // const searchingBy = req.query.term; // ES6 방식
    const {
        query: {term: searchingBy} // term에 searchingBy라는 새로운 이름 부여
    } = req; // 이게 왜 더 좋은 방식이지? 
    // console.log(searchingBy);
    res.render("search", {pageTitle:'Search', searchingBy, videos}); // searchingBy: searchingBy를 간단히 할 수 있음
}

export const getUpload = (req, res) => res.render("upload", {pageTitle:'Upload'});
export const postUpload = async (req, res) => { // object는 upload.pug페이지로부터 post방식으로 전달된 req의 body에 존재함 
    const {
        body:{ title, description}, // 여기서 body는 존재하지 않고 file, title, description만 존재함
        file: { path}
    } = req;
    // To Do : Upload and save video
    // console.log(body, file); // file 이 undefined로 나옴 - 강의에선 multer로 인해 videos/에 파일 생성되면서 url이 찍혀야 함
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    // res.render("upload", {pageTitle: "Upload"});
    res.redirect(routes.videoDetail(newVideo.id)); 
}

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle:'Video Detail'});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle:'Edit Video'});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle:'Delete Video'});