const videoContainer = document.getElementById("jsVideoPlayer");
// let videoPlayer; // 방법1
// 방법 2의 핵심은 독립적인 id를 가진 container가 반드시 필요함
const videoPlayer = document.querySelector("#jsVideoPlayer video"); // 방법2 : container에 id부여해서 if문으로 다같이 검사 후 그 안에 있는 video태그를 가져옴
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
    } else{
        videoPlayer.pause();
    }
}

function init(){
    // 우리가 원하는 기능적인 부분 추가 - adding, finding 변수를 더 할 에정(아직 이해 안됨)
    // videoPlayer = videoContainer.querySelector("video"); // const로 이 안에서 선언 시 다른 함수에서 사용 불가능하기 때문에 밖에서 let으로 선언함 // 방법1
    playBtn.addEventListener("click", handlePlayClick)
}

if(videoContainer){
    init();
}