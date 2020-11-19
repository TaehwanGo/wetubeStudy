import express from "express";
// import windowFunction from "window";

const app = express();
// const window = windowFunction();

// Codesanbox does not need PORT :)
const PORT = 4000;
const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);
// setting port

// handling routes
const handleHome = (req, res) => res.send("Home");
const handleAboutUs = (req, res) => res.send("About-us");
const handleContact = (req, res) => res.send("Contact");
const handleProtected = (req, res) => res.send("Protected");
// const handleProtected = (req, res) => {
//     res.redirect('/');
// }


const protectMiddleware = (req, res) => { // req, res 오타 주의하자 ! 
    res.redirect(`/`); 
}

const globalMiddleware = (res, req, next) => {
    console.log("I'm a middleware");
    next();
}

// routes
app.use(globalMiddleware);
app.get("/", handleHome);
app.get("/about-us", handleAboutUs);
app.get("/contact", handleContact);
app.get("/protected", protectMiddleware, handleProtected);
// app.get("/protected", handleProtected);


// app.listen(() => console.log(`Listening!`));
app.listen(PORT, handleListening); // 포트 4000번을 리슨