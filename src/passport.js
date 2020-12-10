// User authentication
import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy()); // strategy: 로그인 하는 방법 

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
  },
  githubLoginCallback
));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: `http://localhost:4000${routes.facebookCallback}`
},
facebookLoginCallback
));


// passport.serializeUser(User.serializeUser()); // 쿠키에 오직 user.id만 담아서 보내도록 하는 것
passport.serializeUser(function(user, done) {
  done(null, user);
});
 /**
  * passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  */

// passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
/**
 * passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
 */

 // 위 같은 shortcut을 쓰는 이유는 전세계 모든 이들이 똑같은 함수를 시행하기 때문 