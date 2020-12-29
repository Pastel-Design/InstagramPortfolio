document.getElementById('follow-up').addEventListener('click', event => {
    followUp()
})

function followUp() {
    axios.get('/handle/followUp/', {
        params: {}
    })
        .then(function (response) {
            incrementFollows()
        })
        .catch(function (error) {
            incrementFollows()
        })
        .then(function () {
            // always executed
        });
}

function incrementFollows() {
    let text = document.getElementById("follow-count").innerText;
    document.getElementById("follow-count").innerText = (parseInt(text) + 1).toString();
}

function incrementProductInCart(productCode) {
    let productRowCells = document.querySelectorAll("tr[data-product-code='" + productCode + "']")[0].children;
    let priceValue = parseInt(productRowCells[1].innerText);
    let amountValue = parseInt(productRowCells[2].innerText);
    let totalPriceValue = parseInt(productRowCells[3].innerText);
    productRowCells[2].innerText = amountValue + 1;
    productRowCells[3].innerText = totalPriceValue + priceValue;
}