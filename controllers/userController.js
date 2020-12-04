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
        const user = await User.findOne({email}); // 받아온 profile로 db내에서 조회
        // console.log(user);
        // console.log(email);
        if(user){ // github로 로그인하려고 하는 사람의 email이 기존에 존재하는 계정의 email과 같은게 있다면 사용자정보를 update함
            user.githubId = id;
            user.avatarUrl = avatar_url;
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

export const facebookLogin = passport.authenticate('facebook'); // facebook join을 누르면 facebook으로 보냄
// 그다음 유저가 있는지 확인하고
/**
 * passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) { // 여기에 들어가는 부분이 facebookLoginCallback
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
)); 
 */
export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    // console.log(accessToken, refreshToken, profile, cb);
    const { _json: {id, name, email}} = profile;
    try{
        const user = await User.findOne({email});
        // console.log(user);
        // console.log(email);
        if(user){ // github로 로그인하려고 하는 사람의 email이 기존에 존재하는 계정의 email과 같은게 있다면 사용자정보를 update함
            user.facebookID = id;
            user.save();
            return cb(null, user); // error는 null로 없다고 하고, user object를 콜백함 
        } else { // 만약 없다면 새로 계정을 만듦 , if에서 return이므로 else는 없어도 됨
            const newUser = await User.create({
                email,
                name,
                facebookId: id,
                avatarUrl: `https://graph.facebook.com/${id}/picture?type=large` // avatarUrl이 없는 이유는 페이스북엔 graph API라는게 있음 // 사진 다운로드 됨
            })
            return cb(null, newUser);
        }
    } catch(error){
        return cb(error);
    }
}
// 마지막으로 인증 성공했을 때 redirect 해주는 것
export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}


export const logout = (req, res) => {
    // To Do : process log out
    req.logout(); // passport를 사용할 때, 이렇게만 하면 로그아웃이 됨 
    res.redirect(routes.home);
    // res.render("logout", {pageTitle:'Logout'}); // logout.pug는 삭제해도 됨
}

export const getMe = (req, res) => { // userDetail이 하는 것과 같은 일을 함
    // userDetail과 다른점은 userDetail에선 사용자를 찾는 과정이 필요한데, 여기선 현재 로그인된 user를 전달함
    res.render("userDetail", {pageTitle:'User Detail', user: req.user});
}

export const userDetail = async (req, res) => {
    const { params: {id} }= req;
    try{
        const user = await User.findById(id).populate("videos");
        console.log(user); // ing
        res.render("userDetail", {pageTitle:'User Detail', user});
    } catch(error) {
        res.redirect(routes.home);
    }
}
export const getEditProfile = (req, res) => {
    // locals로 loggedUser를 전역화 했으므로 모든 템플릿에서 접근 가능 
    res.render("editProfile", {pageTitle:'Edit Profile'});
}
export const postEditProfile = async (req, res) => {
    const {
        body: {name, email},
        file//: {path} // path는 multer가 file에 path라는 key값으로 경로값을 준 것 
    } = req;
    // console.log(req.body, req.file, req.user, "수정 전 req.body, req.file, req.user");
    try {
        const user = await User.findByIdAndUpdate({_id:req.user._id}, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl   // 만약 유저가 file을 추가하면 file.path, 없으면 req.user.avatarUrl
        });
        res.redirect(routes.me);
    } catch (error) {
        // res.render("editProfile", {pageTitle: "Edit Profile"})
        res.redirect(routes.editProfile);
    }
}

export const getChangePassword = (req, res) => res.render("changePassword", {pageTitle:'Change Password'});

export const postChangePassword = async (req, res) => {
    const {
        body:{
            oldPassword,
            newPassword,
            newPassword1
        }
    } = req;
    try {
        if(newPassword !== newPassword1){
            res.status(400); // google(크롬브라우저)은 패스워드라고 불리는 필드를 매번 찾아내기 때문에 자동저장을 시키지 않도록 하기위해
            res.redirect(`/user${routes.changePassword}`);
            return;
        } else { // 
            await req.user.changePassword(oldPassword, newPassword); // 우리 user는 이미 req.user에 있기 때문에 바로 호출 후 바꿀 수 있음
            res.redirect(routes.me);
        }
    } catch (error) {
        res.status(400);
        res.redirect(`/user${routes.changePassword}`);
    }
}