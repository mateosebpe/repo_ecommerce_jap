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
document.getElementById("").addEventListener("click", function(){
  if(result.images.lenght - 1 < imgPag){
imgPag++;
} else{
  imgPag = 0;
}
showInfo(result);
});
document.getElementById("").addEventListener("click", function(){
  if(imgPag > 0){
imgPag--;
} else{
  imgPag = result.images.lenght - 1;
}
showInfo(result);
});


function showInfo(jsondata){
let htmlContentToAppend = `<div class="row"> 
<div class="col-md-6">
  <img src="`+jsondata.images[imgPag]+`" alt="" class="col">
</div>
<div class="col-md-6" >
  <h2>`+jsondata.name+`</h2>
  <h4 class="text-success">`+jsondata.cost+" "+jsondata.currency+`</h4>
  <p class="text-info">`+jsondata.soldCount+" vendidos.  |  "+"Categoría: "+ jsondata.category +`</p>
  <p style="overflow: auto;">`+jsondata.description+`</p>
</div>`

document.getElementById("product-info-display").innerHTML = htmlContentToAppend;
}