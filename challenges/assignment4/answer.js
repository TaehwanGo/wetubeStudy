import express from "express";

const app = express();

const consoleMiddleware = (req, res, next) => {
  console.log("I'm a middleware");
  next();
};

const protectedMiddleware = (req, res) => {
  res.redirect("/");
};

app.use(consoleMiddleware);
app.get("/", (req, res) => res.send("Home"));
app.get("/about-us", (req, res) => res.send("About Us"));
app.get("/contact", (req, res) => res.send("Contact"));
app.get("/protected", protectedMiddleware, (req, res) => res.send("Protected"));

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
