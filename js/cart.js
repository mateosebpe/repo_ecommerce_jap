currencySelector = document.getElementById('currencySelector');
itemsArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json').then(resultObj => {
        itemsArray = resultObj.data;
        convertCurrency();
    });
});


function makeElements() {
    let htmlContent = ``;
    itemsArray.articles.forEach(element => {
        htmlContent +=
            `<tr>
            <td><img src="${element.src}" height="100px"></td>
             <td>${element.name}</td>
             <td><input type="number" value="${element.count}" onclick="calSubtotal();"></td>
             <td>${element.unitCost + " " + element.currency}</td>
             <td class="subtotal">${parseFloat(element.unitCost) * parseFloat(element.count) + " " + element.currency}</td>
             </tr>`;
    });
    document.getElementById('elements-display').innerHTML = htmlContent;
}

function convertCurrency() {
    itemsArray.articles.forEach(element => {
        if (currencySelector.value == 0 && element.currency == "USD") {
            element.unitCost = parseFloat(element.unitCost) * 40;
            element.currency = "UYU"
        }
        if (currencySelector.value == 1 && element.currency == "UYU") {
            element.unitCost = parseFloat(element.unitCost) / 40;
            element.currency = "USD"
        }
    });
    makeElements()
}

currencySelector.addEventListener('input', () => {
    convertCurrency();
});

function calSubtotal(){
    let subtotals = document.getElementsByClassName('subtotal');
    let total = 0;
    subtotals.forEach(subtotal =>{
        total += subtotal.value;
    });
    console.log(total);
}