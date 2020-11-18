const express = require('express');
const app = express();

const PORT = 4000;

// 서버를 콜백으로 바꾸기
function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening); // 포트 4000번을 리슨