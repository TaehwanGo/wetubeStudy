import express from "express";
import globalRouter from "./routers/globalRouter";
import coursesRouter from "./routers/coursesRouter";
import apiRouter from "./routers/apiRouter";

const app = express();

// Codesanbox does not need PORT :)
const PORT = 4000;
const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);
// setting port

// matching routers
app.use("/", globalRouter);
// app.use("/join", globalRouter);
// app.use("/login", globalRouter);
// app.use("/confirm-account", globalRouter);
app.use("/courses", coursesRouter);
app.use("/api", apiRouter);


// 
app.listen(PORT, handleListening);
// app.listen(() => console.log(`Listening!`));
