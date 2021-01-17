let navBarsButton = document.getElementById("navBarsButton");
let nav = document.querySelector("nav");
let isNavVisible = false;

navBarsButton.addEventListener("click", showNav);

export function showNav() {
    if (!isNavVisible) {
        nav.classList.add("navShown");
        isNavVisible = true
    } else {
        nav.classList.remove("navShown");
        isNavVisible = false;
    }
}