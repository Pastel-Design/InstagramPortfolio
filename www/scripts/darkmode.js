import {showHighlights} from "./highlights";


let bodyTag = document.querySelector("body");
let darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
let isInDark = false;

let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;
if (currentTheme) {
    if (currentTheme === "dark") {
        setDarkmode();
    }
}
showHighlights();

window.onload = () => {
    darkmodeToggleButton.addEventListener("click", setDarkmode);
}

export function setDarkmode() {
    if (!isInDark) {
        darkmodeToggleButton.classList.replace("fa-toggle-off", "fa-toggle-on");
        bodyTag.classList.add("darkMode");
        isInDark = true;
        localStorage.setItem("theme", "dark");
    } else {
        darkmodeToggleButton.classList.replace("fa-toggle-on", "fa-toggle-off");
        bodyTag.classList.remove("darkMode");
        isInDark = false;
        localStorage.setItem("theme", "light");
    }
}
