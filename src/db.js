// export const videos = [
//     {
//         id:321312,
//         title: 'Video awesome',
//         description: 'This is something I love',
//         views: 24,
//         videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//             id: 789456,
//             name: "tony",
//             email: "tony@tony.com"
//         }
//     },
//     {
//         id:234234,
//         title: 'Video super',
//         description: 'This is something I love',
//         views: 24,
//         videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//             id: 789456,
//             name: "tony",
//             email: "tony@tony.com"
//         }
//     },
//     {
//         id:345345,
//         title: 'Video nice',
//         description: 'This is something I love',
//         views: 24,
//         videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//             id: 789456,
//             name: "tony",
//             email: "tony@tony.com"
//         }
//     },
//     {
//         id:345345,
//         title: 'Video perfect',
//         description: 'This is something I love',
//         views: 24,
//         videoFile:"https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//             id: 789456,
//             name: "tony",
//             email: "tony@tony.com"
//         }
//     }
// ]

import mongoose from "mongoose";
// dotenv는 나중에 import해서 왜 템플릿이 필요한지 알게 될 것
import dotenv from "dotenv";
dotenv.config(); // 이 함수로 dotenv에 있는 모든 정보를 불러 올 수 있음 

// string으로 된 Database, 어디에 database가 저장되어 있는지 알려 주는 것
mongoose.connect(
    process.env.PRODUCTION ? process.env.MONGO_URL : process.env.MONGO_URL_LOCAL,
    {
        useNewUrlParser:true, // 새로운 버전의 Mongoose는 이런식으로 configuration을 보낼 수 있음 
        useFindAndModify:false // 이것들은 내가 MongoDB를 사용할때마다 이러한 configuration을 사용하거나 사용하지 않는 것을 알려줌(확실하게 하기 위해서)
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen); // 위의 connection을 열고 이를 확인하는 함수를 만들고 연결 해줌 
db.on("error", handleError);