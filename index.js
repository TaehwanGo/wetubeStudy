// const express = require('express');
import express from "express"; // 위 줄을 최신 자바스크립트로 바꿈 

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
const handleHome = (req, res) => res.send("Hello from home");

// function handleProfile(req, res){
//     res.send("you are on my profile"); // 앞으로 html, css 파일을 전달해야 됨
// } // babel 설치 및 적용 후 아래와 같이 수정 // arrow function
const handleProfile = (req, res) => res.send("you are on my profile"); // arrow function 


app.get("/", handleHome); // 콜백 // get에 대한 request가 있지만 response가 없으면 무한 로딩이 걸림
app.get("/profile", handleProfile);
app.listen(PORT, handleListening); // 포트 4000번을 리슨