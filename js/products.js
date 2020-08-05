var currentProductsArray = [];

function showProductsList (){
    let htmlContentToAppend = "";
    
    for(i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">

          <div class="col-3">
            <img src="`+product.imgSrc+ `"class="img-thumbnail">
          </div>

          <div class="col">
            <div class="d-flex w-100 justify-content-between">
              <h2 class="mb-1">`+product.name+`</h2>
              <p class="text-muted">`+product.cost+" "+product.currency+`</p>
            </div>
            <div>
              <p class="mb-1 text-muted">` +product.description+ `</p>
            </div>
          </div>
        </div>
      </a>`
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts (productsArray){
currentProductsArray = productsArray;
showProductsList();
}



document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(PRODUCTS_URL).then(function(resultObj){
    if(resultObj.status = "ok"){
        sortAndShowProducts(resultObj.data);
    }
})
});