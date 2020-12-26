const menuIcon = document.querySelector(".header__menu__icon");
const menu = document.querySelector(".header__menu");

let visible = false;

function handleMousedown(event) {
    if(!menuIcon.contains(event.target)){
        hideMenu(event);
    }
}

function showMenu() {
    console.log('showMenuStart', visible);
    visible = true;
    menu.removeAttribute('hidden');
    document.addEventListener('click', handleMousedown);
}

function hideMenu(event) {
    if(!menu.contains(event.target)){
        console.log('on hideMenu');
        visible = false;
        menu.setAttribute('hidden', 'ILoveYou');
        document.removeEventListener('click', handleMousedown);
    }
}

menuIcon.addEventListener('click', event => {
    if(visible){
        // close the menu
        console.log('visible', visible);
        hideMenu(event);
    } else {
        // show the menu
        console.log('invisible', visible);
        showMenu();
    }
});