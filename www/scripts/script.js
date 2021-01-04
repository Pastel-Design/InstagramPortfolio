'use strict'

window.onload = () => {
//variables
    //darkmode vars
    let bodyTag = document.querySelector("body");
    let darkmodeToggleButton = document.getElementById("darkmodeToggleButton");
    let isInDark = false;
    //nav vars
    let navBarsButton = document.getElementById("navBarsButton");
    let nav = document.querySelector("nav");
    let isNavVisible = false;
    //highlights vars
    let highlightLeftButton = document.getElementById("highlightsLeftButton");
    let highlightRightButton = document.getElementById("highlightsRightButton");
    let highlights = document.querySelectorAll(".highlights section");
    let highlightsStartIndex = 0

//Basic setup
    let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;
    if (currentTheme){
        if(currentTheme === "dark"){
            setDarkmode();
        }
    }
    showHighlights();

//listeners
    darkmodeToggleButton.addEventListener("click", setDarkmode);
    navBarsButton.addEventListener("click", showNav);
    highlightLeftButton.addEventListener("click", changeHighlightsStartIndex.bind(false, null), false);
    highlightRightButton.addEventListener("click", changeHighlightsStartIndex, false);
    window.addEventListener("resize",showHighlights);

//functions
    function setDarkmode() {
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

    function showNav() {
        if (!isNavVisible) {
            nav.classList.add("navShown");
            isNavVisible = true
        } else {
            nav.classList.remove("navShown");
            isNavVisible = false;
        }
    }

    function showHighlights() {
        let highlightsOnPage = window.innerWidth <= 380 ? 2 : (window.innerWidth <= 480 ? 3 : (window.innerWidth <= 880 ? 4 : 6));
        let highlightCounter = 0;
        for (let i = 0; i < highlights.length; i++) {
            if (i >= highlightsStartIndex && highlightCounter < highlightsOnPage) {
                highlights[i].style.display = "block";
                highlightCounter++;
            } else {
                highlights[i].style.display = "none";
            }
        }

        if (highlightsStartIndex > highlights.length - (highlightsOnPage + 1)) {
            highlightRightButton.style.display = "none";
        } else {
            highlightRightButton.style.display = "block";
        }
        if (highlightsStartIndex < highlightsOnPage - (highlightCounter-1)) {
            highlightLeftButton.style.display = "none";
        } else {
            highlightLeftButton.style.display = "block";
        }
    }

    function changeHighlightsStartIndex(toTheRight = true) {
        if (toTheRight) {
            highlightsStartIndex++;
        } else {
            highlightsStartIndex--;
        }
        showHighlights();
    }

}