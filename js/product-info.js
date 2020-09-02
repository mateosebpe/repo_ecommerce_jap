let imgPag = 0;
let result;
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status == "ok") {
      result = resultObj.data;
      showInfo(result);
    }
  });
});

function showInfo(jsondata) {
  let htmlContentToAppend = `<div class="row"> 
<div class="col-md-6 text-center">
  <img src="`+ jsondata.images[imgPag] + `" alt="" class="col">
  <button class="btn" id="previous">Anterior</button>
  <button class="btn" id="next">Siguiente</button>
</div>
<div class="col-md-6" >
  <h2>`+ jsondata.name + `</h2>
  <h4 class="text-success">`+ jsondata.cost + " " + jsondata.currency + `</h4>
  <p class="text-info">`+ jsondata.soldCount + " vendidos.  |  " + "Categoría: " + jsondata.category + `</p>
  <p style="overflow: auto;">`+ jsondata.description + `</p>
</div>`

  document.getElementById("product-info-display").innerHTML = htmlContentToAppend;

  document.getElementById("next").addEventListener("click", function () {
    if (imgPag < jsondata.images.length - 1) {
      imgPag++;
    } else {
      imgPag = 0;
    }
    showInfo(result);
  });

  document.getElementById("previous").addEventListener("click", function () {
    if (imgPag > 0) {
      imgPag--;
    } else {
      imgPag = jsondata.images.length - 1;
    }
    showInfo(result);
  });
}