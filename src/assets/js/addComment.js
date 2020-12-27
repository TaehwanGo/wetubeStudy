import axios from "axios";
import routes from "../../routes";
import "./deleteComment"; // 페이지 채로 import해도 사용 안됨
import { initDelete } from "./deleteComment"; // export없이 못 가져옴

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const inputComment = document.getElementById("jsInputComment");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = (newComment) => { //comment, commentObject // 댓글이 등록되면 새로고침 없이 댓글이 바로 등록되는 것처럼 보이게 하는 것
    const li = document.createElement("li");
    const avatarImg = document.createElement("img");
    const commentBox = document.createElement("div");
    const creatorName = document.createElement("span");
    const commentText = document.createElement("span");
    const commentIconContainer = document.createElement("div");
    const editIcon = document.createElement("i");
    const deleteIcon = document.createElement("i");

    // creator-avatar
    avatarImg.src = newComment.avatarUrl;
    avatarImg.setAttribute("class", "comment-creator-avatar");

    // commentBox
    creatorName.innerHTML = newComment.name;
    creatorName.setAttribute("class", "comment-creator");
    commentText.innerHTML = newComment.text;
    commentText.setAttribute("class", "comment-text");
    commentBox.appendChild(creatorName);
    commentBox.appendChild(commentText);

    // commentIconContainer
    editIcon.setAttribute("class", "fas fa-pen");
    deleteIcon.id = "jsCommentDeleteButton";
    deleteIcon.className = "far fa-trash-alt";
    commentIconContainer.appendChild(editIcon);
    commentIconContainer.appendChild(deleteIcon);

    //  appendChild to li
    // li.id = newComment.creator;
    li.id = newComment._id; // 여기에서 실수 하고 있었네 
    li.appendChild(avatarImg);
    li.appendChild(commentBox);
    li.appendChild(commentIconContainer);

    // styling (like css) layout
    // commentContents.style.display = "flex";
    li.style.display = "grid";
    li.style.gridTemplateColumns = "30px 1fr 30px";
    li.style.gap = "10px";
    // li.style.marginBottom = "15px";
    avatarImg.style.width = "30px";
    avatarImg.style.height = "30px";
    avatarImg.style.borderRadius = "50%";

    commentBox.style.display = "flex";
    commentBox.style.flexDirection = "column";
    commentBox.style.alignItems = "flex-start";

    commentText.style.whiteSpace = "normal";
    commentText.style.wordBreak = "break-all";

    creatorName.style.fontSize = "0.8rem";
    creatorName.style.marginBottom = "5px";

    commentIconContainer.style.height = "100%";
    commentIconContainer.style.display = "flex";
    commentIconContainer.style.flexDirection = "column";
    commentIconContainer.style.justifyContent = "flex-start";

    editIcon.style.cursor = "pointer";
    editIcon.style.marginBottom = "10px";
    deleteIcon.style.cursor = "pointer";

    commentList.prepend(li); // 최신것이 맨앞으로 <-> append는 최신것이 맨뒤로
    
    increaseNumber();
    initDelete(commentList); // 이벤트 리스너 추가 됨
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
    // console.log("response", response); // response.data에서 commentId받아서 li에 추가해줘야함 그리고 이벤트 리스너 추가
    const {
        data:newComment // { commentId, userName }
    } = response;

    // console.log("data(newComment):",newComment); // ok 확인 good
    if(response.status === 200){
        addComment(newComment);
    }
}

// 댓글 추가하는 함수
const handleSubmit = (event) => {
    event.preventDefault(); // 댓글 추가 시 새로고침 되는 것을 막음
    const commentInput = addCommentForm.querySelector("input"); // submit한 시점에 input에 있는 값을 가져올 것이므로 input text 태그에 name속성이 필요 없음
    // console.log("comment:",commentInput.value);
    if(commentInput.value === ''){
        return
    }
    else {
        const comment = commentInput.value;
        
        sendComment(comment);
        commentInput.value = ""; // 댓글을 등록하면 빈칸으로 만들어줌
    }
}

const checkLogin = async () => {
    // 로그인 여부 확인 후 로그인상태가 아니면 confirm메세지 보냄
    const response = await axios({
        method: "GET",
        url: `/api${routes.checkLogin}`,
    });
    // console.log("response:", response);
    // console.log("response.data:", response.data); // 이거 왜 실행 안되지?
    if(response.data === 'logout' && confirm("로그인 하시겠습니까?")){
        window.location.href = routes.login;
    }
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
    inputComment.addEventListener("focus", checkLogin);
}

if(addCommentForm) {
    init();
}