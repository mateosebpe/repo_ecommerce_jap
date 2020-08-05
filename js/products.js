var currentProductsArray = [];

function sortAndShowProducts (productsArray){
currentProductsArray = productsArray;
}



document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(PRODUCTS_URL).then(function(resultObj){
    if(resultObj.status = "ok"){
        sortAndShowProducts(resultObj.data);
    }
});
});