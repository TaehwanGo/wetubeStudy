// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me"; // 추가한 이유는 userController에 userDetail에서 
// 사용자마다 똑같은 user template을 사용할 텐데, 해당 id를 가진 사용자를
// userDetail에서 찾도록하는게 싫어서 수정 -> me 컨트롤러 작성

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id"; // parameter의 키값이 id 가 됨
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// API URL : 단지 서버와 커뮤니케이션을 위한 URL
// 유저는 이 URL에 접근 할 수 없고, 이 URL은 어떤것도 렌더링하지 않음
const API = "/api";
const CHECK_LOGIN = "/checkLogin";
const DELETE_COMMENT = "/deleteComment";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const EDIT_COMMENT = "/:id/editComment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  // userDetail: USER_DETAIL,
  userDetail: (id) => {
    // console.log(id);
    if(id){
      return `/users/${id}`;
    }
    else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  // videoDetail: VIDEO_DETAIL,
  videoDetail: (id) => {
    if(id){ // id 값이 null 또는 undefined가 아니라면 
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  // editVideo: EDIT_VIDEO,
  editVideo: (id) =>{
    if(id){
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if(id){
      return `/videos/${id}/delete`
    } else {
      return DELETE_VIDEO;
    }
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  registerView : REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT,
  editComment: EDIT_COMMENT,
  checkLogin: CHECK_LOGIN
};

export default routes;