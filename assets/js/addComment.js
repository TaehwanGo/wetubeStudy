import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = (comment) => { // 댓글이 등록되면 새로고침 없이 댓글이 바로 등록되는 것처럼 보이게 하는 것
    const li = document.createElement("li");
    const span = document.createElement("span");
    // const delBtn = document.createElement("span"); // 실시간 삭제가 구현이 아직 안됨 ajax 공부먼저 해보자
    // delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    span.innerHTML = comment;
    li.appendChild(span);
    // li.appendChild(delBtn);
    commentList.prepend(li); // 최신것이 맨앞으로 <-> append는 최신것이 맨뒤로
    increaseNumber();
}

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
    // console.log(response);
    if(response.status === 200){
        addComment(comment);

    }
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