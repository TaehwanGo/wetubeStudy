const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
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
    } catch (error) {
        // 만약 사용자가 카메라 권한을 허용하지 않는다면
        recordBtn.innerHTML = "😥 Can't record";
        recordBtn.removeEventListener("click", startRecording);
    }
}

function init(){
    recordBtn.addEventListener("click", startRecording);
}

if (jsRecordContainer) {
    init();
}