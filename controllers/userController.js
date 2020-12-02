import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => { // /join에 get 방식에 해당하는 컨트롤러
    res.render("join", {pageTitle:'Join'});
}
export const postJoin = async (req, res, next) => { // /join에 post 방식에 해당하는 컨트롤러 // 회원가입 시 자동로그인을 위해 middleware로 바꿈 : next() 추가
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
            // console.log(email);
            await User.register(user, password); // 이게 뭔지 잘 모르겠네 위 create이랑 무슨차이지? //register는 object를 받아서 password를 추가 후 등록
            next(); // req, res 가 그대로 전달 됨(postLogin 으로)
        } catch(error) {
            console.log(error);
            // res.redirect(routes.home);
        }
    } 
}
export const getLogin = (req, res) => 
    res.render("login", {pageTitle:'Login'});

// passport 인증 방식은 username(여기선 email)과 password를 찾아보도록 설정되어 있음 
export const postLogin = passport.authenticate('local', { // 'local'은 strategy 중 하나임(ex github or facebook or email)
    failureRedirect: routes.login,
    successRedirect: routes.home
}); 

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => { // github에서 돌아 오면 실행
    // console.log(accessToken, refreshToken, profile, cb);
    const { _json: {id, avatar_url, name, email} } = profile;
    try{
        const user = await User.findOne({email});
        console.log(user);
        // console.log(email);
        if(user){ // github로 로그인하려고 하는 사람의 email이 기존에 존재하는 계정의 email과 같은게 있다면 사용자정보를 update함
            user.githubId = id;
            user.save();
            return cb(null, user); // error는 null로 없다고 하고, user object를 콜백함 
        } else { // 만약 없다면 새로 계정을 만듦 , if에서 return이므로 else는 없어도 됨
            const newUser = await User.create({
                email,
                name,
                githubId: id,
                avatarUrl: avatar_url
            })
            return cb(null, newUser);
        }
    } catch(error){
        return cb(error);
    }
};

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // To Do : process log out
    req.logout(); // passport를 사용할 때, 이렇게만 하면 로그아웃이 됨 
    res.redirect(routes.home);
    // res.render("logout", {pageTitle:'Logout'}); // logout.pug는 삭제해도 됨
}
export const userDetail = (req, res) => res.render("userDetail", {pageTitle:'User Detail'});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle:'Edit Profile'});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle:'Change Password'});