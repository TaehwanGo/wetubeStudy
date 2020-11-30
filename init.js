import dotenv from "dotenv";
import "./db";
import app from "./app"; // index.js를 app.js와 init.js로 분리

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000
// console.log(PORT);
const handleListening = () => console.log(`✅ Listening on: http://localhost${PORT}`);

app.listen(PORT, handleListening);