export const home = (req, res) => {
    res.render("home", {pageTitle:'Home'}); 
}

export const login = (req, res) => {
    res.render("login", {pageTitle:'Login'}); 
}

export const photos = (req, res) => {
    res.render("photos", {pageTitle:'Photos'}); 
}

export const profile = (req, res) => {
    res.render("profile", {pageTitle:'Profile'}); 
}