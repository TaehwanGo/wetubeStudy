// User model field : 이름, 이메일, 페이스북 아이디, 깃허브 아이디, 아바타 URL 등 
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    // password: String, // User.create으로 만들면 password가 암호화가 안됨 
    avatarUrl: { // fileUrl과 같은 방식으로 동작, 서버에 업로드를 한다면 서버url이 될 수도 있음
        type: String,
        default: "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png"
    }, 
    facebookId: Number,
    githubId: Number, // social ID는 왜 Number 일까? 
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"}); // passport-local-mongoose는 configuration object가 필요 // 구분하는 기준값이구나 id(email) 같은 고유한 값

const model = mongoose.model("User", UserSchema);

export default model;
// Passport-local-mongoose를 쓸거라서 아직 Passport가 개입되지 않았음 