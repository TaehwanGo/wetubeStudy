// import {videos} from "../db"; // 더 이상 controller에서 import하는게 아닌 init.js에서 import 해서 사용 할 것임
import routes from "../routes"
import Video from "../models/Video"; // 이건 단지 model 이고 dattabase의 element가 아님 

export const home = async (req, res) => { // async가 없다면 videos를 발견 못 하면 그냥 render 함
    try{ // 기다리긴 하지만 error가 발생한 경우도 success로 간주하여 render로 넘어가기 때문에 try catch를 적용 
        // 이 find은 모든, 어떤 video든 가져올 것임, await은 오직 async function안에서만 가능함
        const videos = await Video.find({}).sort({'_id': -1}); // 역순으로 정렬 -1은 순서를 위아래를 바꾸겠다는 약속같은 것 
        res.render("home", {pageTitle:'Home', videos}); // res.send("Home") 대신 html을 보내기 위해 render로 수정, /views가 default 폴더이기 때문에 따로 import하지 않아도 자동으로 찾아서 전송함
        // console.log(next);
    } catch(error) {
        console.log(error);
        res.render("home", {pageTitle:'Home', videos: []});
    }
    // console.log(videos);
    // home화면에 비디오 목록을 띄울 것 임
}
export const search = async (req, res) => {
    // const searchingBy = req.query.term; // ES6 방식
    const {
        query: {term: searchingBy} // term에 searchingBy라는 새로운 이름 부여
    } = req; 
    // console.log(searchingBy);
    let videos = [];
    try{
        videos = await Video.find({title:{$regex: searchingBy, $options: "i" } }); // 정확히 똑같은 단어만 찾는다면 find({title:searchingBy})로 하면 되지만 
        // 포함된 단어를 찾기 위해 mongoose의 regex를 사용함, "i" : insensitive (대소문자 구분없이 찾아줌)
    } catch(error) {
        console.log(error);
    }
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
    // console.log(req.user);
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save(); // req.user에 넣어주면 save()를 해줘야 되는 구나
    // console.log(newVideo);
    // res.render("upload", {pageTitle: "Upload"});
    res.redirect(routes.videoDetail(newVideo.id)); 
}

export const videoDetail = async (req, res) => {
    // console.log(req.params); // 만약 controller에서 어떤 data를 가지고 있다는 것을 표현하고 싶다면 더블콜론(:)과 이름을 넣으면 된다
    const {
        params: {id}
    } = req;
    try{
        const video = await Video.findById(id).populate("creator");
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
    // console.log(req.user);
    try{
        const video = await Video.findById(id); // db에서 id값이 일치하는 video object를 가져와서 video에 저장한 다음 진행
        // console.log(video);
        if(video.creator != req.user.id) { // bug fix type unmatched, !== -> !=
            throw Error(); // catch로 감 
        } else {
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video}); // 위에서 가져온 video 객체 : video
        }
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
        await Video.findOneAndUpdate({_id:id  }, {title, description}); // form의 default value 설정함
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
        const video = await Video.findById(id); // db에서 id값이 일치하는 video object를 가져와서 video에 저장한 다음 진행
        if(video.creator != req.user.id) {
            throw Error(); // catch로 감 
        } else {
            await Video.findOneAndRemove({_id:id});
        }
    } catch(error) {
        console.log(error); // 아직 error message는 가지고 있지 않음, 나중에 추가 할 예정 
    }
    res.redirect(routes.home); // try와 catch가 공통적으로 redirect home이라서 밖으로 뺌
}