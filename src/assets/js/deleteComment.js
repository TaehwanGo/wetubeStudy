import axios from "axios";

const commentDeleteBtn = document.getElementById("jsCommentDeleteButton");

let commentList = document.getElementById("jsCommentList");

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
    // console.log("deleteCommentOnLocal() 실행");
    // console.log(ulArray.length);
    for(let i = 0; i<ulArray.length; i++){
        // console.log("for:",i);
        // console.log("commentList[i].id",ulArray[i].id);
        // console.log("commentId",commentId);
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
    // console.log("videoId: ",videoId, "commentId", commentId);
    try {
        const response = await axios({
            method: "POST",
            url: `/api/deleteComment`,
            data: {
                commentId,
                videoId
            }
        });
        // console.log(response);

        if(response.status === 200){ 
            // console.log("status 200 이면 실행 됨");
            deleteCommentOnLocal(commentId); // 서버에서 ok 응답을 받았으므로 프론트에서 오프라인으로 지움
        }
    } catch (error) {
        console.log(error);
    }
}

export const handleDeleteClick = (event) => {
    // 클릭하면 부모 html의 아이디를 얻을 수 있다고 한다
    // event.preventDefault(); // 삭제버튼으로 form태그를 사용안하므로 필요 없어짐
    // console.log("handleDeleteClick:",event.target);
    if(confirm("댓글을 삭제 하시겠습니까?")){ // 예
        // console.log(event.target);
        // postDeleteComment에 commentId, videoId를 보내야 함
        const videoId = window.location.href.split("/videos/")[1];
        // console.log("videoId:", videoId);
        const commentId = event.target.parentNode.parentNode.id;
        // console.log("commentId:", commentId);
        deleteCommentFromDB(videoId, commentId);
    } 
    else { // 아니오
        return;// 아무것도 안함 - if문만 있으면 될듯 
    }
}

export const sendEditedComment = async (spanComment, editedText) => { 
    const commentId = spanComment.parentNode.parentNode.id;
    // console.log("commentId:",commentId);
    const response = await axios({ 
        method: "POST",
        url: `/api/${commentId}/editComment`,
        data: {
            editedText
        }
    });
    // console.log("response", response);
}

export function showEditForm(spanComment) {
    const editForm = document.createElement('div');
    const editText = document.createElement('input');
    const buttonContainer = document.createElement('div');
    const editCommentCancelBtn = document.createElement('button');
    const editCommentSubmit = document.createElement('button');

    editText.setAttribute('type', 'text');
    editCommentSubmit.innerHTML = "save";
    editText.value = spanComment.textContent;
    editCommentCancelBtn.innerHTML = "cancel";

    buttonContainer.appendChild(editCommentCancelBtn);
    buttonContainer.appendChild(editCommentSubmit);

    editForm.appendChild(editText);
    editForm.appendChild(buttonContainer);

    // styling
    editCommentCancelBtn.style.width = "70px";
    editCommentCancelBtn.style.backgroundColor = "#f5f5f5";
    editCommentCancelBtn.style.color = "#444444";
    editCommentCancelBtn.style.marginRight = "5px";
    editCommentSubmit.style.width = "70px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "flex-end";
    buttonContainer.style.marginTop = "5px";
    editForm.style.width = "100%";

    spanComment.setAttribute('hidden', 'ILoveYou'); // hide comment span
    const iconBox = spanComment.parentNode.parentNode.children[2];
    iconBox.style.display = "none";
    // console.log(spanComment.parentNode.parentNode.children[2]);
    spanComment.parentNode.appendChild(editForm);

    editCommentSubmit.addEventListener('click', (event) => {
        // save edited comment using API
        const editedText = event.target.parentNode.parentNode.children[0].value;
        // console.log("justEditedText:",editedText);
        sendEditedComment(spanComment, editedText);

        spanComment.textContent = editedText;
        editForm.remove();
        spanComment.removeAttribute('hidden');
        iconBox.style.display = "flex";
    });
    editCommentCancelBtn.addEventListener('click', () => {
        // show the comment box(span) again
        editForm.remove();
        spanComment.removeAttribute('hidden');
        iconBox.style.display = "flex";
    });
}

export function handleEditClick(event) {
    // console.log(event.target);
    // const commentText = event.target.value;
    // console.log("commentText: ",commentText);
    // event.target.setAttribute('contentEditable', true);
    const spanComment = event.target.parentNode.parentNode.children[1].children[1];
    // console.log("comment text:",spanComment.textContent);
    showEditForm(spanComment);
}

export const addListenerToIcons = (event) => {
    const target = event.target;
    // console.log(target);
    if(target.matches('.fa-pen')){
        // console.log('edit clicked!');
        handleEditClick(event); 
    } else if (target.matches('.fa-trash-alt')){
        // console.log('delete clicked!');
        handleDeleteClick(event);
    }
}


export function initDelete(ulFromAddComment) {
    // console.log("initDelete실행: ",ulFromAddComment);
    if(ulFromAddComment){
        commentList = ulFromAddComment;
    }

    // 새로운 방식 이벤트 위임(event delegation)
    commentList.removeEventListener('click', addListenerToIcons); // 댓글 등록 시 기존에 리스너에 계속 덧붙여서 등록했기 때문에 기존리스너 삭제
    commentList.addEventListener('click', addListenerToIcons);
    
    
    // 기존 구현 방식 : 하나하나 이벤트 리스너를 달아줌 // object형태로 가져와야 됨 // 그래야 for문을 돌려서 event리스너를 달 수 있음
    // if(ulFromAddComment){
    //     ulArray = ulFromAddComment.getElementsByTagName('li'); // 이게 왜 배열로 적용이 안되어 있지
    //     console.log("ulArray = pointer실행");
    // }
    // console.log(ulArray);

    // for(let i = 0; i<ulArray.length; i++){ // 이벤트 리스너 추가
    //     // console.log("for:",i, ulArray[i].children[1]);
    //     if(ulArray[i].children[2]){ // 삭제아이콘 태그가 있다면 (작성자가 작성했으면 있음)
    //         // 아마 이 object를 다시 html element로 바꿔야 될지도 모름 - 다행히 변환안해도 잘 붙네
    //         ulArray[i].children[2].children[1].addEventListener("click", handleDeleteClick);
    //     }
    // }
}

if(commentDeleteBtn) {
    initDelete();
}