import app from "./app"; // index.js를 app.js와 init.js로 분리

const PORT = 4000;

const handleListening = () => console.log(`✅ Listening on: http://localhost${PORT}`);

app.listen(PORT, handleListening);