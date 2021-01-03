'use strict'

window.onload = () => {
//variables
    let bodyTag = document.querySelector("body");
    let darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
    let isInDark = false;

//listeners
    darkmodeToggleButton.addEventListener("click", setDarkmode);


//functions
    function setDarkmode() {
        if (!isInDark) {
            darkmodeToggleButton.classList.replace("fa-toggle-off", "fa-toggle-on");
            bodyTag.classList.add("darkMode");
            isInDark = true;
        }else {
            darkmodeToggleButton.classList.replace("fa-toggle-on", "fa-toggle-off");
            bodyTag.classList.remove("darkMode");
            isInDark = false;
        }
    }
}