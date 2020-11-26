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

export const videoDetail = async (req, res) => {
    // console.log(req.params); // 만약 controller에서 어떤 data를 가지고 있다는 것을 표현하고 싶다면 더블콜론(:)과 이름을 넣으면 된다
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id);
        // console.log(video);
        res.render("videoDetail", {pageTitle: video.title, video});
    } catch(error) {
        res.redirect(routes.home);
    }
}
export const getEditVideo = async (req, res) => {
    const {
        params: {id}
    } = req; // req object안에 params 변수안의 값을 id라는 변수로 받음 
    try{
        const video = await Video.findById(id); // db에서 id값이 일치하는 video object를 가져와서 video에 저장한 다음 진행
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video}); // 위에서 가져온 video 객체 : video
    } catch(error) {
        res.redirect(routes.home);
    }
}
export const postEditVideo = async (req, res) => {
    const {
        params: {id},
        body: {title, description}
    } = req;
    try {
        // 변수에 저장하지 않는 이유는 업데이트하면 그걸로 끝이기 때문에 // 원래는 _id:id 이지만 mongoose가 해결할 거라 믿어서 id만 적음 // 그러나 mongoose는 그만큼 똑똑하지 못해서 _id:id로 적어 줘야 함
        await Video.findOneAndUpdate({ _id:id }, {title, description}); // form의 default value 설정함
        res.redirect(routes.videoDetail(id)); // 내 생각 : `/videos/${id}` // 정답 : routes.videoDetail(id)
    } catch(error) {
        res.redirect(routes.home); // 매번 try-catch를 하지 않고 middleware를 만들어서 할 수도 있음 
    }
}
export const deleteVideo = async (req, res) => {
    // res.render("deleteVideo", {pageTitle:'Delete Video'});
    const {
        params: {id}
    } = req;
    try{
        await Video.findOneAndRemove({_id:id});
    } catch(error) {}
    res.redirect(routes.home); // try와 catch가 공통적으로 redirect home이라서 밖으로 뺌
}