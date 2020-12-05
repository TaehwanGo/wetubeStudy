const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    console.log(event);
    // recording이 종료될때마다 blob이 생기는데 이게 우리가 다운로드 할 것
    const { data: videoFile } = event;
    // 다운로드 후 이 파일에서 부터 url을 생성해야 바로 업로드가 가능
    const link = document.createElement("a"); // a태그 생성
    link.href = URL.createObjectURL(videoFile); // 이거 뭔지 확인 필요 : URL 생성하는 코드
    link.download = "recorded.webm"; // webm은 opensource라서 우리가 다운로드해서 쓸수 있음 // 다운로드가 실행되는 링크를 생성
    document.body.appendChild(link); // body의 child로 link(a태그)를 append(덧붙임)
    link.click(); // 한번 click 을 코드로 해줌
}

function stopStreamedVideo(videoElem) { // 녹화종료 후 카메라끄는 부분
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
        track.stop();
    });
    
    videoElem.srcObject = null;
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
    stopStreamedVideo(videoPreview); // 녹화종료 후 카메라끄는 부분
}

const startRecording = () => {
    // console.log(streamObject);
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start(); // 데이터를 1초단위 패킷으로 얻고 싶으면 videoRecorder.start(1000);
    console.log(videoRecorder);
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    // setTimeout(() => videoRecorder.stop(), 5000); // 5초뒤 녹화 종료시킴 -> dataavailable를 발생시킴
    recordBtn.addEventListener("click", stopRecording);
}

const getVideo = async () => {
    try { // 사용법은 mdn 사이트에 자세히 나옴 : https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        // await(기다리는 이유) : media 접근 허락을 기다림
        const stream = await navigator.mediaDevices.getUserMedia({
            // configuration object
            audio: true,
            video: { width: 1280, height: 720 } // 카메라 해상도 설정 가능
        });
        // console.log(stream); 
        // 0, 1로 된 stream을 바꾸는 작업 필요함
        videoPreview.srcObject = stream; // src에다가 videoPlayer를 줄순 없음, src="file", file이 아닌 object임
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording(); // stream을 저장하는 코드 // 매개변수로 전달하는 대신 stream을 전역변수로 만듦(let streamObject)
    } catch (error) {
        // 만약 사용자가 카메라 권한을 허용하지 않는다면
        recordBtn.innerHTML = "😥 Can't record";
    } finally { // try-catch 어느곳이던 여긴 반드시 실행됨
        recordBtn.removeEventListener("click", getVideo);

    }
}

function init(){
    recordBtn.addEventListener("click", getVideo);
    // recordBtn.onclick = getVideo; // 방법1 : 다른점 : 단지 한개의 onclick이벤트를 갖음
    // recordBtn.onclick = null; 로 삭제가 되지만 모든걸 삭제시키는 단점이 있음, 그래서 사용안함

    
}

if (jsRecordContainer) {
    init();
}