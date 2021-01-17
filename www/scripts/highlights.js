let highlightLeftButton = document.getElementById("highlightsLeftButton");
let highlightRightButton = document.getElementById("highlightsRightButton");
let highlights = document.querySelectorAll(".highlights a");
let highlightsStartIndex = 0
let highlightsOnPage;
if (highlightLeftButton) {
    highlightLeftButton.addEventListener("click", changeHighlightsStartIndex.bind(false, null), false);
    highlightRightButton.addEventListener("click", changeHighlightsStartIndex, false);
    window.addEventListener("resize", showHighlights);
}

export function showHighlights() {
    highlightsOnPage = window.innerWidth <= 400 ? 2 : (window.innerWidth <= 552 ? 3 : (window.innerWidth <= 880 ? 4 : 6));
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

export function changeHighlightsStartIndex(toTheRight = true) {
    if (toTheRight) {
        highlightsStartIndex += highlightsOnPage;
    } else {
        highlightsStartIndex -= highlightsOnPage;
    }
    showHighlights();
}
