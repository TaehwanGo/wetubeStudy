import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
// let videoPlayer; // 방법1
// 방법 2의 핵심은 독립적인 id를 가진 container가 반드시 필요함
const videoPlayer = document.querySelector("#jsVideoPlayer video"); // 방법2 : container에 id부여해서 if문으로 다같이 검사 후 그 안에 있는 video태그를 가져옴
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const videoRange = document.getElementById("jsVideoRange");
const videoController = document.querySelector(".videoPlayer__controls");

let checkFullScreen = false;

const registerView = () => {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
        method: "POST"
    }); // 조회수에 그렇게 신경쓰지 않을거라 await은 사용하지 않음
}

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick() {
    if(videoPlayer.muted) {
        videoPlayer.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        volumeRange.value = videoPlayer.volume; // unmute하면 다시 range를 이전으로 되돌림
    }
    else {
        volumeRange.value = 0; // mute하면 range를 0으로 만듦
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}



function watchFullScreen() {
    if(checkFullScreen){ // full -> normal
        fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        videoContainer.style.backgroundColor = "#f0f0f0";
        videoContainer.style.padding = "7px 9px";
        checkFullScreen = false; 
    }
    else { // normal -> full
        videoContainer.style.backgroundColor = "black";
        videoContainer.style.padding = "0px";
        checkFullScreen = true;
        window.addEventListener("keydown", (event) => { 
            if(event.keyCode === 27){
                console.log("esc가 눌려서 버튼 원복")
                fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                videoContainer.style.backgroundColor = "#f0f0f0";
                videoContainer.style.padding = "7px 9px";
            }
        });
    }
}

function exitFullScreen() {
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener("click", goFullScreen);
    if (videoContainer.exitFullscreen) {
        videoContainer.exitFullscreen();
        // videoContainer.style.backgroundColor = "#f0f0f0";
        // videoContainer.style.padding = "7px 9px";
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // dom은 fullscreen으로 만들 수 없음
        // videoContainer.style.backgroundColor = "#f0f0f0";
        // videoContainer.style.padding = "7px 9px";
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        // videoContainer.style.backgroundColor = "#f0f0f0";
        // videoContainer.style.padding = "7px 9px";
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        // videoContainer.style.backgroundColor = "#f0f0f0";
        // videoContainer.style.padding = "7px 9px";
    }
}

function goFullScreen() {
    // videoContainer.requestFullscreen(); // videoPlayer로 하는 것과 차이점 : 그래야 우리가 만든 컨트롤버튼들만 동작하게 할 수 있음
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
        // videoContainer.style.backgroundColor = "black";
        // videoContainer.style.padding = "0px";
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
        // videoContainer.style.backgroundColor = "black";
        // videoContainer.style.padding = "0px";
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
        // videoContainer.style.backgroundColor = "black";
        // videoContainer.style.padding = "0px";
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
        // videoContainer.style.backgroundColor = "black";
        // videoContainer.style.padding = "0px";
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener("click", goFullScreen);
    fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = totalSeconds => {
    const secondsNumber = parseInt(totalSeconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let seconds = secondsNumber - hours * 3600 - minutes * 60;
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
};

function updateTime() {
    // display current time string
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));

    // video range update
    videoRange.value = videoPlayer.currentTime;
}
  
async function setTotalTime() {
    let totalTimeString;
    // console.log(videoPlayer.duration);
    // if(videoPlayer.duration !== Infinity){
    //     totalTimeString = formatDate(videoPlayer.duration);
    // }
    // else {
        console.log(videoPlayer.duration);
        const blob = await fetch(videoPlayer.src).then(response => response.blob()); // fetch는 http통신용인줄 알았는데
        // videoPlayer.src를 받아서 그걸 서버에 요청해서 응답을 받으면 response.blob반환(blob는 파일)
        const duration = await getBlobDuration(URL.createObjectURL(blob));
        console.log(duration);
        totalTimeString = formatDate(duration);
    // }
    totalTime.innerHTML = totalTimeString;
    // setInterval(getCurrentTime, 1000);
    // 
}

function handleEnded() {
    registerView(); // 조회수 증가하는 함수
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
    const {
        target: { value }
    } = event;
    videoPlayer.volume = value;
    if (value >= 0.6) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (value >= 0.2) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
}

function handleVideoDrag() {
    videoPlayer.currentTime = videoRange.value;
    videoRange.max = Math.floor(videoPlayer.duration);
}

function hideController() {
    videoController.style.opacity = 0;
    videoController.style.transition = "0.4s linear";
    hideVolumeRange();
    console.log("hideController()");
}

function handleMouseMove() {
    let setHideController = null;
    videoPlayer.addEventListener('mousemove', ()=>{
        videoController.style.opacity = 1;
        window.clearTimeout(setHideController);
        setHideController = setTimeout(hideController, 3000);
    });
}

function handleVideoClick() {
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function showVolumeRange() {
    volumeRange.style.opacity = 1;
    volumeRange.style.transition = "0.2s linear";
}

function hideVolumeRange() {
    volumeRange.style.opacity = 0;
    volumeRange.style.transition = "0.2s linear";
}

// function handleSpace() {
//     window.addEventListener('keydown', (event) => {
//         event.preventDefault();
//         if(event.keyCode === 32){
//             if(videoPlayer.paused){
//                 videoPlayer.play();
//                 playBtn.innerHTML = '<i class="fas fa-pause"></i>';
//             } else{
//                 videoPlayer.pause();
//                 playBtn.innerHTML = '<i class="fas fa-play"></i>';
//             }
//         }
//     });
// }

function handleSpace(event) {
    event.preventDefault();
    if(event.keyCode === 32){
        if(videoPlayer.paused){
            videoPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else{
            videoPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
}

function init(){
    // 우리가 원하는 기능적인 부분 추가 - adding, finding 변수를 더 할 에정(아직 이해 안됨)
    // videoPlayer = videoContainer.querySelector("video"); // const로 이 안에서 선언 시 다른 함수에서 사용 불가능하기 때문에 밖에서 let으로 선언함 // 방법1
    
    handleMouseMove();
    videoPlayer.volume = 0.5;
    videoRange.value = 0;
    videoRange.max = Math.floor(videoPlayer.duration);
    // setTotalTime(); // 비디오 플레이어에 토탈 시간 수정 필요
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime); // 느리면 이 이벤트가 감지가 안되는것 같다. 
    // videoPlayer.addEventListener("onload", setTotalTime); // 느리면 이 이벤트가 감지가 안되는것 같다. 
    videoPlayer.addEventListener("timeupdate", updateTime);
    videoPlayer.addEventListener("ended", handleEnded);
    videoPlayer.addEventListener("mouseenter", () => {
        window.addEventListener("keypress", handleSpace);
    }); // handleSpace(); // play and pause by space
    videoPlayer.addEventListener("mouseleave", () => {
        window.removeEventListener("keypress", handleSpace);
    })
    volumeRange.addEventListener("input", handleDrag);
    volumeBtn.addEventListener("mouseenter", showVolumeRange);
    volumeRange.addEventListener("mouseleave", hideVolumeRange);
    videoRange.addEventListener("input", handleVideoDrag);
    videoPlayer.addEventListener("click", handleVideoClick);
    videoContainer.addEventListener("fullscreenchange", watchFullScreen);
}

if(videoContainer){
    init();
}