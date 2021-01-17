let photoDialog = document.getElementById("photoDialog");
let photos = document.querySelectorAll("article .image");
let imagesRightButton = document.getElementById("imagesRightButton");
let imagesLeftButton = document.getElementById("imagesLeftButton");
let displayedImage = document.querySelector("#photoDialog img");
let imgDiv = document.querySelector(".photoInfo");

if (photoDialog) {
    for (let photo of photos) {
        photo.addEventListener("click", showImageDialog.bind(false, photo.id));
        photo.addEventListener("click", setImageText.bind(false, photo.getAttribute("img-info-id")));
    }
    photoDialog.addEventListener("click", closeImageDialog);
    imagesLeftButton.addEventListener("click", e => e.stopPropagation());
    imagesRightButton.addEventListener("click", e => e.stopPropagation());
    imgDiv.addEventListener("click", e => e.stopPropagation());
    imagesRightButton.addEventListener("click", changeImageInDialog);
    imagesLeftButton.addEventListener("click", changeImageInDialog.bind(false, false));
    displayedImage.addEventListener("click", changeImageInDialog);
}

export function showImageDialog(photoId) {
    if (typeof photoDialog.showModal === "function") {
        displayedImage.src = document.getElementById(photoId).src.replace(/thumbnail/, "fullview");
        displayedImage.id = photoId;
        photoDialog.showModal()
        photoDialog.style.display = "flex";
    } else {
        alert("The <dialog> API is not supported by this browser");
    }
}

export function closeImageDialog() {
    photoDialog.close();
    photoDialog.style.display = "";
}

export function changeImageInDialog(toTheRight = true) {
    let id;
    let currentImageId = parseInt(displayedImage.id.match(/\d+$/)[0]);
    let idNumbers = [];
    for (let img of photos) {
        idNumbers.push(parseInt(img.id.match(/\d+$/)[0]));
    }
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
    displayedImage.src = document.getElementById(id).src.replace(/thumbnail/, "fullview");
    setImageText(document.getElementById(id).getAttribute("img-info-id"))
}

export function setImageText(imageId) {
    axios.get('/handle/getImageText', {
        params: {
            "imageId": imageId,
        }
    })
        .then(function (response) {
            setImageTextDom(response.data.response);
        })
        .catch(function (error) {
            setImageTextDom(null, false)
        })
        .then(function () {
            // always executed
        });
}

export function setImageTextDom(response, iserr = true) {
    if (iserr) {
        document.querySelector("dialog .info h3").textContent = response.title;
        document.querySelector("dialog .info p").textContent = response.description;
    } else {
        document.querySelector("dialog .info h3").textContent = "";
        document.querySelector("dialog .info p").textContent = "";
    }
}