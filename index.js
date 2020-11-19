// index.js를 app.js와 init.js로 분리 ( 이 파일은 사용되지 않음 2.7에서 스탑된 파일 )
// const express = require('express');
import express from "express"; // 위 줄을 최신 자바스크립트로 바꿈 
import morgan from "morgan"; // logging middleware
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

// 서버를 콜백으로 바꾸기
// function handleListening() {
//     console.log(`Listening on: http://localhost:${PORT}`);
// }
const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

// function handleHome(req, res){ // post나 get방식으로 클라이언트가 무언가 request를 하면 req object를 이용함
//     console.log('Hi from home!!'); // get에 대한 request가 있지만 response가 없으면 무한 로딩이 걸림 // 보통 서버는 응답으로 html을 보냄
//     // console.log(req);
//     res.send("Hello from home");
// }
const handleHome = (req, res) => {
    // console.log("I'm home");
    res.send("Hello from home");
}

// function handleProfile(req, res){
//     res.send("you are on my profile"); // 앞으로 html, css 파일을 전달해야 됨
// } // babel 설치 및 적용 후 아래와 같이 수정 // arrow function
const handleProfile = (req, res) => res.send("you are on my profile"); // arrow function 

// const betweenHome = (req, res, next) => {
//     console.log("I'm between");
//     next();
// }

app.use(cookieParser());
app.use(bodyParser.json()); // 나중에 이것이 없을때 어떤 결과를 나타내는지 비교해볼 것 임
app.use(bodyParser.urlencoded({extended:true})); // body-parser엔 우리가 정의해야할 옵션이 있음 json, text, urlencoded 등 

app.use(helmet()); // import를 반드시 해줘야 함 // 안하면 helmet is not defined 
app.use(morgan("dev")); // tiny, combined, dev, ... 등 여러가지 logging 종류가 있음


// app.use(betweenHome); // 기본적으로 웹사이트에서 일어나는 모든 것에 대한 미들웨어 // top to bottom 으로 실행 됨  // global middleware
// app.get("/", betweenHome, handleHome); // 콜백 // get에 대한 request가 있지만 response가 없으면 무한 로딩이 걸림 // local middleware
app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening); // 포트 4000번을 리슨