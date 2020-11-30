import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => { // /join에 get 방식에 해당하는 컨트롤러
    res.render("join", {pageTitle:'Join'});
}
export const postJoin = async (req, res) => { // /join에 post 방식에 해당하는 컨트롤러
    // console.log(req.body); // body parser랑 관련이 있는건가? 맞네 body parser를 쓰지 않으면 undefined로 나옴 
    const {
        body: {name, email, password, password2}
    } = req;
    // console.log(req.body); // 회원정보 
    if(password !== password2){
        // send wrong status code
        res.status(400);
        res.render("join", {pageTitle: "Join"});
    }
    else{
        // To Do: Resgister User
        try{
            const user = await User({ // User.create 를 사용하면 password가 암호화가 안됨 
                name, 
                email
            }); // db에 user 등록
            await User.register(user, password); // 이게 뭔지 잘 모르겠네 위 create이랑 무슨차이지? //register는 object를 받아서 password를 추가 후 등록
        } catch(error) {
            console.log(error);
        }

        // To Do: Log user in

        res.redirect(routes.home);
    }
}
export const getLogin = (req, res) => res.render("login", {pageTitle:'Login'});
export const postLogin = (req, res) => {
    res.redirect(routes.home); // successful // 나중엔 DB에 있는 비밀번호와 같은지 검사해야 함 
    // 나중에 authentication(사용자 인증)에 문제가 생기면 다시 login 화면을 표시 하게 할 예정 
}
export const logout = (req, res) => {
    // To Do : process log out
    res.redirect(routes.home);
    // res.render("logout", {pageTitle:'Logout'}); // logout.pug는 삭제해도 됨
}
export const userDetail = (req, res) => res.render("userDetail", {pageTitle:'User Detail'});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle:'Edit Profile'});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle:'Change Password'});