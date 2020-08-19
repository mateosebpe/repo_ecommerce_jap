var currentProductsArray = [];
let maxCost = undefined;
let minCost = undefined;

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status = "ok") {
      sortAndShowProducts(resultObj.data);
    }
  })
});


//=====================================================================================
/*Element maker*/

function showProductsList() {
  let htmlContentToAppend = "";

  for (i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];
    if (((minCost === undefined) || (minCost != undefined && product.cost >= parseInt(minCost))) && ((maxCost === undefined) || (maxCost != undefined && product.cost <= parseInt(maxCost)))) {
      htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">

          <div class="col-3">
            <img src="`+ product.imgSrc + `"class="img-thumbnail">
          </div>

          <div class="col">
            <div class="d-flex w-100 justify-content-between">
              <h2 class="mb-1">`+ product.name + " - " + product.cost + " " + product.currency + `</h2>
              <p class="text-muted">Vendidos: `+ product.soldCount + `</p>
            </div>
            <div>
              <p class="mb-1 text-muted">` + product.description + `</p>
            </div>
          </div>
        </div>
      </a>
      `
    }
  }
  document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(productsArray) {
  currentProductsArray = productsArray;
  showProductsList();
}
//=====================================================================================
/*Filter by cost*/

//Filter
document.getElementById("rangeFilterCount").addEventListener("click", function () {
  let min = document.getElementById("rangeFilterCountMin").value;
  let max = document.getElementById("rangeFilterCountMax").value;
  if (min != undefined && parseInt(min) >= 0) {
    minCost = parseInt(min);
  } else {
    minCost = undefined;
  }
  if (max != undefined && parseInt(max) >= 0) {
    maxCost = parseInt(max);
  } else {
    maxCost = undefined;
  }

  showProductsList();
});

//Clear
document.getElementById("clearRangeFilter").addEventListener("click", function () {
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";
  maxCost = undefined;
  minCost = undefined;
  showProductsList();
});