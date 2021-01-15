'use strict'

window.onload = () => {
    new MiniLazyload({
        rootMargin: "500px",
        placeholder: "https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image"
    }, ".lazyload", MiniLazyload.IGNORE_NATIVE_LAZYLOAD)

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
    let highlights = document.querySelectorAll(".highlights a");
    let highlightsStartIndex = 0
    let highlightsOnPage;
    //dialog vars
    let photoDialog = document.getElementById("photoDialog");
    let photos = document.querySelectorAll("article .image");
    let imagesRightButton = document.getElementById("imagesRightButton");
    let imagesLeftButton = document.getElementById("imagesLeftButton");
    let displayedImage = document.querySelector("#photoDialog img");
    let imgDiv = document.querySelector(".photoInfo");

//Basic setup

    let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;
    if (currentTheme) {
        if (currentTheme === "dark") {
            setDarkmode();
        }
    }
    showHighlights();

//listeners
    darkmodeToggleButton.addEventListener("click", setDarkmode);
    navBarsButton.addEventListener("click", showNav);
    highlightLeftButton.addEventListener("click", changeHighlightsStartIndex.bind(false, null), false);
    highlightRightButton.addEventListener("click", changeHighlightsStartIndex, false);
    window.addEventListener("resize", showHighlights);
    for (let photo of photos) {
        console.log(photo.id);
        photo.addEventListener("click", showImageDialog.bind(false, photo.id));
    }
    photoDialog.addEventListener("click", closeImageDialog);
    imagesLeftButton.addEventListener("click", e => e.stopPropagation());
    imagesRightButton.addEventListener("click", e => e.stopPropagation());
    imgDiv.addEventListener("click", e => e.stopPropagation());
    imagesRightButton.addEventListener("click", changeImageInDialog);
    imagesLeftButton.addEventListener("click", changeImageInDialog.bind(false, false));
    displayedImage.addEventListener("click", changeImageInDialog);


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
        highlightsOnPage = window.innerWidth <= 380 ? 2 : (window.innerWidth <= 480 ? 3 : (window.innerWidth <= 880 ? 4 : 6));
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
        if (highlightsStartIndex < highlightsOnPage - (highlightCounter - 1)) {
            highlightLeftButton.style.display = "none";
        } else {
            highlightLeftButton.style.display = "block";
        }
    }

    function changeHighlightsStartIndex(toTheRight = true) {
        if (toTheRight) {
            highlightsStartIndex += highlightsOnPage;
        } else {
            highlightsStartIndex -= highlightsOnPage;
        }
        showHighlights();
    }

    function showImageDialog(photoId) {
        console.log(photoId)
        if (typeof photoDialog.showModal === "function") {
            displayedImage.src = document.getElementById(photoId).style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1].replace(/thumbnail/, "fullview");
            displayedImage.id = photoId;
            photoDialog.showModal()
            photoDialog.style.display = "flex";
        } else {
            alert("The <dialog> API is not supported by this browser");
        }
    }

    function closeImageDialog() {
        photoDialog.close();
        photoDialog.style.display = "";
    }

    function changeImageInDialog(toTheRight = true) {
        let id;
        let currentImageId = parseInt(displayedImage.id.match(/\d+$/)[0]);
        let idNumbers = [];
        for (let img of photos) {
            idNumbers.push(parseInt(img.id.match(/\d+$/)[0]));
        }
        console.log(idNumbers);
        if (toTheRight) {
            if (currentImageId >= Math.max(...idNumbers)) {
                currentImageId = 0;
            } else {
                currentImageId++;
            }
        } else {
            if (currentImageId <= 0) {
                currentImageId = Math.max(...idNumbers);
            } else {
                currentImageId--;
            }
        }
        id = "image_" + currentImageId;
        displayedImage.id = id;
        console.log(displayedImage.id);
        displayedImage.src = document.getElementById(id).style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1].replace(/thumbnail/, "fullview");
    }

}