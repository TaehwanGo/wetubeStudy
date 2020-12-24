const navWrapper = document.getElementById("jsNavWrapper");
const innerMainLogo = document.getElementById("jsInnerMainLogo");
const innerNavIcon = document.getElementById("jsInnerNavIcon");
const headerNavIcon = document.getElementById("jsHeaderNavIcon");
const navCover = document.getElementById("jsNavCover");

function openNav() {
    navWrapper.style.width = "100%";
}

function closeNav() {
    navWrapper.style.width = "0%";
}

innerMainLogo.addEventListener("click", closeNav);
innerNavIcon.addEventListener("click", closeNav);
headerNavIcon.addEventListener("click", openNav);
navCover.addEventListener("click", closeNav);