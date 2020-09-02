//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {
            showInfo(resultObj.data);

        }
    });
});

function showInfo(jsondata){
let htmlContentToAppend = `<div class="row"> 
<div class="col-md-6">
  <img src="`+jsondata.images[1]+`" alt="" class="col">
</div>
<div class="col-md-6" >
  <h2>`+jsondata.name+`</h2>
  <h4 class="text-success">`+jsondata.cost+" "+jsondata.currency+`</h4>
  <p class="text-info">`+jsondata.soldCount+" vendidos.  |  "+"Categoría: "+ jsondata.category +`</p>
  <p style="overflow: auto;">`+jsondata.description+`</p>
</div>`

document.getElementById("product-info-display").innerHTML = htmlContentToAppend;
}