import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
        type: String,
        default: "default name"
    },
    avatarUrl: {
        type: String,
        default: "https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png"
    }
    // ,
    // video: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Video"
    // }
});

// 위 스키마로 부터 model을 작성
const model = mongoose.model("Comment", CommentSchema); // model의 이름은 Video 이고 schema는 위의 VideoSchema를 사용

export default model;