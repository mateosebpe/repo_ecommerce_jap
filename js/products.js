const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_COST = "Cost.";

var currentSortProductsCriteria = undefined;
var currentProductsArray = [];

let maxCost = undefined;
let minCost = undefined;

//=====================================================================================
/*Filter by order*/
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name > b.name) { return -1; }
      if (a.name < b.name) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_COST) {
    result = array.sort(function (a, b) {
      let aCost = parseInt(a.cost);
      let bCost = parseInt(b.cost);

      if (aCost > bCost) { return -1; }
      if (aCost < bCost) { return 1; }
      return 0;
    });
  }
  return result;
}

document.getElementById("sortAsc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_ASC_BY_NAME);
});

document.getElementById("sortDesc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_DESC_BY_NAME);
});

document.getElementById("sortByCost").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_COST);
});

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

//=====================================================================================
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status = "ok") {
      sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
    }
  })
});

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortProductsCriteria = sortCriteria;
  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }
  currentProductsArray = sortProducts(currentSortProductsCriteria, currentProductsArray);
  showProductsList();
}

//=====================================================================================

