const ENVIO_PREMIUM = 'premium';
const ENVIO_EXPRESS = 'express';
const ENVIO_STANDARD = 'standard';

currencySelector = document.getElementById('currencySelector');
itemsArray = [];
//Variables para calcular el total
let subtotal_principal;
let metodo_de_envio = ENVIO_PREMIUM;
let costo_de_envio;
let moneda;
let forma_de_pago = undefined;



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json').then(resultObj => {
        itemsArray = resultObj.data;
        convertCurrency();
    });
});

//----------------------------------------Seleccionar moneda--------------------------------------------------
currencySelector.addEventListener('input', () => {
    convertCurrency();
});
function convertCurrency() {
    itemsArray.articles.forEach(element => {
        moneda = currencySelector.value;
        if (moneda == "UYU" && element.currency == "USD") {
            element.unitCost = parseFloat(element.unitCost) * 40;
            element.currency = "UYU"
        }
        if (moneda == "USD" && element.currency == "UYU") {
            element.unitCost = parseFloat(element.unitCost) / 40;
            element.currency = "USD"
        }

    });
    makeElements()
}
//----------------------------------------Crear elementos--------------------------------------------------
function makeElements() {
    let htmlContent = ``;
    itemsArray.articles.forEach(function (element, index) {
        htmlContent +=
            `<tr>
            <td><img src="${element.src} " class="rounded" height="100px"></td>
             <td>${element.name}</td>
             <td>${element.unitCost}</td>
             <td><input type="number" id="input${index}" value="${element.count}" min="1" onclick="changeSub(${element.unitCost},${index});"></td>
             <td id="subtotal${index}" class="text-left">${parseFloat(element.unitCost) * parseFloat(element.count)}</td>
             <td>${moneda}</td>
             </tr>`;
        element.subtotal = parseFloat(element.unitCost) * parseFloat(element.count);
    });
    document.getElementById('elements-display').innerHTML = htmlContent;
    calcSub();
}
//----------------------------------------Cambiar cantidades------------------------------------------------
function changeSub(cost, index) {
    let subtotal_secundario = document.getElementById('subtotal' + index);
    subtotal_secundario.innerText = document.getElementById('input' + index).value * cost;
    itemsArray.articles[index].subtotal = document.getElementById('input' + index).value * cost;
    calcSub();
}
//----------------------------------------Seleccionar forma de pago------------------------------------------------
let forma_de_pago_select = document.getElementById('forma_de_pago_select');
let forma_de_pago_formulario = document.getElementById('forma_de_pago_formulario');

document.getElementById('forma_de_pago_boton').addEventListener('click', () => {
    forma_de_pago = forma_de_pago_select.value;
    document.getElementById('forma_de_pago_preview').innerHTML = forma_de_pago;
    document.getElementById('pago_modal').modal('hide');
});
//----------------------------------------Seleccionar método de envío----------------------------------------
document.getElementById('premium-tab').addEventListener('click', () => {
    metodo_de_envio = ENVIO_PREMIUM;
    calcularEnvio();
});
document.getElementById('express-tab').addEventListener('click', () => {
    metodo_de_envio = ENVIO_EXPRESS;
    calcularEnvio();
});
document.getElementById('standard-tab').addEventListener('click', () => {
    metodo_de_envio = ENVIO_STANDARD;
    calcularEnvio();
});
//----------------------------------------Calcular subtotal--------------------------------------------------
function calcSub() {
    subtotal_principal = 0;
    // let subs = document.getElementByClassName('');
    itemsArray.articles.forEach(element => {
        subtotal_principal += element.subtotal;
    });

    document.getElementById('subtotal').innerHTML = subtotal_principal;
    document.getElementById('moneda').innerHTML = currencySelector.value;

    calcularEnvio();
}
//----------------------------------------Calcular total con envío---------------------------------------------
function calcularEnvio() {
    let htmlContent = `<td>${subtotal_principal + " " + moneda}</td>`;
    switch (metodo_de_envio) {
        case ENVIO_PREMIUM:
            costo_de_envio = (subtotal_principal / 100) * 15;
            htmlContent += `<td>${costo_de_envio + " " + moneda + " (15% del total)"}</td>`
            break;
        case ENVIO_EXPRESS:
            costo_de_envio = (subtotal_principal / 100) * 7;
            htmlContent += `<td>${costo_de_envio + " " + moneda + " (7% del total)"}</td>`
            break;
        case ENVIO_STANDARD:
            costo_de_envio = (subtotal_principal / 100) * 5;
            htmlContent += `<td>${costo_de_envio + " " + moneda + " (5% del total)"}</td>`
            break;
    }
    htmlContent += `<th>${costo_de_envio + subtotal_principal + " " + moneda}</th>`

    document.getElementById('tabla_total').innerHTML = htmlContent;
}

//----------------------------------------Confirmar compra---------------------------------------------

document.getElementById('confirmar_compra').addEventListener('click', () => {
    if (forma_de_pago != undefined) {
 

        $('#modal_felicidades').modal('show')

    } else {
        let options = {placement: 'right',container: 'body', title: '¡Debes rellenar la forma de pago!', content: "De lo contrario no podrás realizar la compra."}
        $('#forma_de_pago_contenedor').popover(options);
        $('#forma_de_pago_contenedor').popover('show');
        setTimeout(() =>{$('#forma_de_pago_contenedor').popover('hide');}, 3000);
    }
});
