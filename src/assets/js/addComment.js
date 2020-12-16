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
    const commentText = document.createElement("span");
    const creatorName = document.createElement("span"); // .setAttribute("class", "userName") create이랑 동시엔 안되나보다
    const icon = document.createElement("i");
    const commentContents = document.createElement("div");
    const commentUserInfo = document.createElement("div");
    const avatarImg = document.createElement("img");

    // delete icon
    icon.id = "jsCommentDeleteButton";
    icon.className = "far fa-trash-alt";

    // contents
    li.id = newComment.creator;
    avatarImg.src = newComment.avatarUrl;
    creatorName.innerHTML = newComment.name;
    commentText.innerHTML = newComment.text;

    // appendChild to userInfo
    commentUserInfo.appendChild(avatarImg);
    commentUserInfo.appendChild(creatorName);

    // appendChild to contents
    commentContents.appendChild(commentUserInfo);
    commentContents.appendChild(commentText);

    // appendChild to li
    li.appendChild(commentContents);
    li.appendChild(icon);

    // styling (like css) layout
    commentContents.style.display = "flex";
    commentContents.style.justifyContent = "flex-start";
    commentContents.style.alignItems = "center";
    commentUserInfo.style.marginRight = "4vh";
    commentUserInfo.style.display = "flex";
    commentUserInfo.style.flexDirection = "column";
    commentUserInfo.style.alignItems = "center";

    // styling (like css) size
    avatarImg.style.width = "30px";
    avatarImg.style.height = "30px";
    avatarImg.style.borderRadius = "50%";
    creatorName.style.marginTop = "5px";
    creatorName.style.padding = "3px 5px";
    creatorName.style.backgroundColor = "white";
    creatorName.style.borderRadius = "7px";



    commentList.prepend(li); // 최신것이 맨앞으로 <-> append는 최신것이 맨뒤로
    
    increaseNumber();
    initDelete(commentList); // 이게 왜 실행이 안될까
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
    console.log("response", response); // response.data에서 commentId받아서 li에 추가해줘야함 그리고 이벤트 리스너 추가
    const {
        data:newComment // { commentId, userName }
    } = response;

    console.log("data(newComment):",newComment); // ok 확인 good
    if(response.status === 200){
        addComment(newComment);
    }
}

// 댓글 추가하는 함수
const handleSubmit = (event) => {
    event.preventDefault(); // 댓글 추가 시 새로고침 되는 것을 막음
    const commentInput = addCommentForm.querySelector("input"); // submit한 시점에 input에 있는 값을 가져올 것이므로 input text 태그에 name속성이 필요 없음
    console.log("comment:",commentInput.value);
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