import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");

// api(comment를 db에 등록하는)로 보내주는 함수
const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        method: "POST",
        url: `/api/${videoId}/comment`,
        data: {
            comment
        }
    });
    console.log(response);
}

// 댓글 추가하는 함수
const handleSubmit = (event) => {
    event.preventDefault(); // 댓글 추가 시 새로고침 되는 것을 막음
    const commentInput = addCommentForm.querySelector("input"); // submit한 시점에 input에 있는 값을 가져올 것이므로 input text 태그에 name속성이 필요 없음
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = ""; // 댓글을 등록하면 빈칸으로 만들어줌
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm) {
    init();
}