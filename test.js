// 삭제 버튼 구현 

// assets/js/deleteComment.js
import axios from "axios";

const delCommentForm = document.querySelector("#jsDeleteComment");
const commentList = document.querySelector(".video__comments-list");
const commentNumber = document.getElementById("jsCommentNumber");

const arrangeList = (listItem) => { // 댓글 삭제 시 개수 표시 하는 부분
    // console.log(event.target.parentNode.parentNode.parentNode);
    listItem.style.display = "none";
    // event.target.parentNode.parentNode.parentNode.style.display = "none";
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

export const deleteComment = async (deleteTargetOfListItem, deleteCommentId) => {
    const videoId = window.location.href.split("/videos/")[1];
    axios.post(`/api/${deleteCommentId}/comment/delete`, {
        deleteCommentId,
        videoId
    }).then((response) => {
        if (response.status === 200) {
            console.log("Your comment has been deleted.");
            arrangeList(deleteTargetOfListItem)
        }
    }).catch((error) => {
        console.log(error.response)
    })
}

export const handleCommentId = (event) => {
    // event.preventDefault();
    // const commentId = event.target.querySelector(".commentID")["value"];
    const deleteTargetOfListItem = event.target.parentNode.parentNode;
    const deleteCommentId = event.target.id;
    // console.log(deleteTargetOfListItem, deleteCommentId);
    deleteComment(deleteTargetOfListItem, deleteCommentId)
}

export const initDelete = (deleteBtn) => {
    // delCommentForm.addEventListener("submit", (event) => event.preventDefault());
    // console.log(deleteBtn)
    deleteBtn.forEach(btn => {
        btn.addEventListener("click", handleCommentId)
    })

    console.log(deleteBtn);
};








// apiRouter.js
apiRouter.post(routes.loadComments, postLoadComments); // 이건 뭔지 모르겠고
apiRouter.post(routes.deleteComments, postDeleteComment);





