currencySelector = document.getElementById('currencySelector');
itemsArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json').then(resultObj => {
        itemsArray = resultObj.data;
        convertCurrency();
    });
});

function convertCurrency() {
    itemsArray.articles.forEach(element => {
        if (currencySelector.value == "UYU" && element.currency == "USD") {
            element.unitCost = parseFloat(element.unitCost) * 40;
            element.currency = "UYU"
        }
        if (currencySelector.value == "USD" && element.currency == "UYU") {
            element.unitCost = parseFloat(element.unitCost) / 40;
            element.currency = "USD"
        }

    });
    makeElements()
}

function makeElements() {
    let htmlContent = ``;
    itemsArray.articles.forEach(function(element,index) {
        htmlContent +=
            `<tr>
            <td><img src="${element.src}" height="100px"></td>
             <td>${element.name}</td>
             <td><input type="number" id="input${index}" value="${element.count}" onclick="changeSub(${element.unitCost},${index});"></td>
             <td>${element.unitCost}</td>
             <td id="subtotal${index}">${parseFloat(element.unitCost) * parseFloat(element.count)}</td>
             <td>${element.currency}</td>
             </tr>`;
    });
    document.getElementById('elements-display').innerHTML = htmlContent;
}

function changeSub(cost, index) {
    let subtotal = document.getElementById('subtotal' + index);
    console.log(subtotal);
    subtotal.innerText = document.getElementById('input' + index).value * cost;
    itemsArray.articles[index].subtotal = document.getElementById('input' + index).value * cost;
}

function calcSub() {
    let total = 0;
    let subs = document.getElementByClassName('');
    itemsArray.articles.forEach(element => {
        element.subtotal = parseFloat(element.unitCost) * parseFloat(element.count);
        total += element.subtotal;
    });

document.getElementById('subtotal').innerHTML = total + currencySelector.value;
    convertCurrency();
}


currencySelector.addEventListener('input', () => {
    convertCurrency();
});