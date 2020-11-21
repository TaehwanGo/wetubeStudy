import routes from "../routes";

export const getJoin = (req, res) => { // /join에 get 방식에 해당하는 컨트롤러
    res.render("join", {pageTitle:'Join'});
}
export const postJoin = (req, res) => { // /join에 post 방식에 해당하는 컨트롤러
    // console.log(req.body); // body parser랑 관련이 있는건가? 맞네 body parser를 쓰지 않으면 undefined로 나옴 
    const {
        body: {name, email, password, password2}
    } = req;
    console.log(req.body); 
    if(password !== password2){
        // send wrong status code
        res.status(400);
        res.render("join", {pageTitle: "Join"});
    }
    else{
        // To Do: Resgister User
        // To Do: Log user in
        res.redirect(routes.home);
    }
}
export const login = (req, res) => res.render("login", {pageTitle:'Login'});
export const logout = (req, res) => res.render("logout", {pageTitle:'Logout'});
export const userDetail = (req, res) => res.render("userDetail", {pageTitle:'User Detail'});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle:'Edit Profile'});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle:'Change Password'});