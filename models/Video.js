import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl:{
        type: String,
        required: 'File URL is required'
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// 위 스키마로 부터 model을 작성
const model = mongoose.model("Video", VideoSchema); // model의 이름은 Video 이고 schema는 위의 VideoSchema를 사용

export default model; // init.js에서 import 됨 