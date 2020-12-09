import axios from "axios";

const commentDeleteBtn = document.getElementById("jsCommentDeleteButton");

const commentList = document.getElementById("jsCommentList");

let ulArray;
if(commentList){
    ulArray = commentList.getElementsByTagName('li'); // ul 태그
}
const commentNumber = document.getElementById("jsCommentNumber");

export const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

export const deleteCommentOnLocal = (commentId) => { // local에서 삭제(새로고침 없이 삭제되는 것 처럼 보이기 위해)
    // HTMLElement 삭제, commentId랑 같은 id의 li 태그
    console.log("deleteCommentOnLocal() 실행");
    console.log(ulArray.length);
    for(let i = 0; i<ulArray.length; i++){
        console.log("for:",i);
        console.log("commentList[i].id",ulArray[i].id);
        console.log("commentId",commentId);
        if(ulArray[i].id === commentId){
            // 삭제
            ulArray[i].remove();
            break;
        }
    }
    decreaseNumber();
}

export const deleteCommentFromDB = async (videoId, commentId) => {
    // fake delete 
    console.log("videoId: ",videoId, "commentId", commentId);
    try {
        const response = await axios({
            method: "POST",
            url: `/api/deleteComment`,
            data: {
                commentId,
                videoId
            }
        });
        console.log(response);

        if(response.status === 200){ // 미완성
            console.log("status 200 이면 실행 됨");
            deleteCommentOnLocal(commentId); // 서버에서 ok 응답을 받았으므로 프론트에서 오프라인으로 지움
        }
    } catch (error) {
        console.log(error);
    }
}

export const handleDeleteClick = (event) => {
    // 클릭하면 부모 html의 아이디를 얻을 수 있다고 한다
    // event.preventDefault(); // 삭제버튼으로 form태그를 사용안하므로 필요 없어짐
    console.log(event.target);

    if(confirm("댓글을 삭제 하시겠습니까?")){ // 예
        console.log(event.target);

        // postDeleteComment에 commentId, videoId를 보내야 함
        const videoId = window.location.href.split("/videos/")[1];
        const commentId = event.target.parentNode.id;
        // console.log("videoId:", videoId);
        // console.log("commentId:", commentId);
        deleteCommentFromDB(videoId, commentId);
    } 
    else { // 아니오
        // 아무것도 안함 - if문만 있으면 될듯 
    }
}


export function initDelete(ulFromAddComment) {
    console.log("initDelete실행: ",ulFromAddComment);
    // commentDeleteBtn.addEventListener("click", handleDeleteClick); // 이렇게 하면 제일 위에 하나밖에 안붙음
    // object형태로 가져와야 됨 // 그래야 for문을 돌려서 event리스너를 달 수 있음
    // const ulArray = commentList.getElementsByTagName('li'); // ul 태그
    // console.log(ulArray);
    
    if(ulFromAddComment){
        ulArray = ulFromAddComment.getElementsByTagName('li');
        console.log("ulArray = pointer실행");
    }

    for(let i = 0; i<ulArray.length; i++){ // 이벤트 리스너 추가
        // console.log("for:",i, ulArray[i].children[1]);
        if(ulArray[i].children[1]){ // 삭제아이콘 태그가 있다면 (작성자가 작성했으면 있음)
            // 아마 이 object를 다시 html element로 바꿔야 될지도 모름 - 다행히 변환안해도 잘 붙네
            ulArray[i].children[1].addEventListener("click", handleDeleteClick);
        }
    }
}

if(commentDeleteBtn) {
    initDelete();
}