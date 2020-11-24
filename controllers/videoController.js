import {videos} from "../db";
import routes from "../routes"

export const home = (req, res) => {
    // home화면에 비디오 목록을 띄울 것 임
    res.render("home", {pageTitle:'Home', videos}); // res.send("Home") 대신 html을 보내기 위해 render로 수정, /views가 default 폴더이기 때문에 따로 import하지 않아도 자동으로 찾아서 전송함
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
export const postUpload = (req, res) => { // object는 upload.pug페이지로부터 post방식으로 전달된 req의 body에 존재함 
    const {
        body:{ file, title, description}
    } = req;
    // To Do : Upload and save video
    res.redirect(routes.videoDetail(321312)); // it's a fake id
}

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle:'Video Detail'});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle:'Edit Video'});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle:'Delete Video'});