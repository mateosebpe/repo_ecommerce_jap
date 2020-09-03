let imgPag = 0;
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status == "ok") {
      showInfo(resultObj.data);
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status == "ok") {
      showComments(resultObj.data);
    }
  });
});

function showInfo(infoData) {
  let htmlContentToAppend = `<div class="row"> 
<div class="col-md-6 text-center">
  <img src="`+ infoData.images[imgPag] + `" alt="" class="col">
  <button class="btn" id="previous">Anterior</button>
  <button class="btn" id="next">Siguiente</button>
</div>
<div class="col-md-6" >
  <h2>`+ infoData.name + `</h2>
  <h4 class="text-success">`+ infoData.cost + " " + infoData.currency + `</h4>
  <p class="text-info">`+ infoData.soldCount + " vendidos.  |  " + "Categoría: " + infoData.category + `</p>
  <p style="overflow: auto;">`+ infoData.description + `</p>
</div>`

  document.getElementById("product-info-display").innerHTML = htmlContentToAppend;

  document.getElementById("next").addEventListener("click", function () {
    if (imgPag < infoData.images.length - 1) {
      imgPag++;
    } else {
      imgPag = 0;
    }
    showInfo(infoData);
  });

  document.getElementById("previous").addEventListener("click", function () {
    if (imgPag > 0) {
      imgPag--;
    } else {
      imgPag = infoData.images.length - 1;
    }
    showInfo(infoData);
  });
}

function showComments(comments){
let htmlContentToAppend = "";

for(let i = 0; i < comments.length; i++){
  let starsHtml = "";
  for(let h = 0; h < 5; h++){
    if(h < comments[i].score){
      starsHtml +=`<span class="fa fa-star checked"></span>`
    } else{
      starsHtml +=`<span class="fa fa-star"></span>`
    }
  }

  htmlContentToAppend += `  <div class="list-group-item">
  <p class="font-weight-bold" id="name">`+comments[i].user+`</p>
  <p>`+comments[i].description+`</p>
  <p class="text-info">`+comments[i].dateTime+ starsHtml+`</p>
</div>`
}
document.getElementById("comments-display").innerHTML = htmlContentToAppend;
}