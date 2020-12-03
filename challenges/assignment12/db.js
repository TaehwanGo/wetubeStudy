import mongoose from "mongoose";
/*
DONT TOUCH THIS FILE <3
WE ARE ALL SHARING THE SAME DB
PLEASE DONT TOUCH THIS FILE
*/
mongoose.connect(
  "mongodb://wetubechallenge:5FWHVDXyedBTziC@ds237357.mlab.com:37357/wetube-challenge-day12",
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
