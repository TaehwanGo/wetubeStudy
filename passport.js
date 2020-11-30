// User authentication
import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); // strategy: 로그인 하는 방법 
/** 아래와 같이 긴 코드를 user.createStrategy() 로 간단하게 사용가능하게 해줌 
 * var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
 */

 passport.serializeUser(User.serializeUser()); // 쿠키에 오직 user.id만 담아서 보내도록 하는 것
 /**
  * passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  */

passport.deserializeUser(User.deserializeUser());
/**
 * passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
 */

 // 위 같은 shortcut을 쓰는 이유는 전세계 모든 이들이 똑같은 함수를 시행하기 때문 