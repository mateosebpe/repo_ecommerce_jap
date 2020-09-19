let imgPag = 0;
let commentArray = [];
let relatedArray;
//=====================================================================================

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function(e){
    if (e.status == "ok"){
      relatedArray = e.data;
    }
  });
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status == "ok") {
      showInfo(resultObj.data);
      showProductsRelated(resultObj.data);
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status == "ok") {
      commentArray = resultObj.data;
      showComments(commentArray);
    }
  });
  commentAuth();
});



//=====================================================================================

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

//=====================================================================================

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

//=====================================================================================


function commentAuth ()
{
  //Checkeo autorización de sesión para comentar
  let succefulLoggedUser = 
  `<div>
<textarea class="col-md-12" type="text" placeholder="Escribe aquí tu comentario..." id="text-comment"></textarea>
<br>
 <div class="star-rating">
    <input id="star-5" type="radio" name="rating" value="5" />
    <label for="star-5" title="5 stars">
      <i class="active fa fa-star"></i>
    </label>

    <input id="star-4" type="radio" name="rating" value="4" />
    <label for="star-4" title="4 stars">
      <i class="active fa fa-star"></i>
    </label>

    <input id="star-3" type="radio" name="rating" value="3" />
    <label for="star-3" title="3 stars">
      <i class="active fa fa-star"></i>
    </label>

    <input id="star-2" type="radio" name="rating" value="2" />
    <label for="star-2" title="2 stars">
      <i class="active fa fa-star"></i>
    </label>

    <input id="star-1" type="radio" name="rating" value="1" checked />
    <label for="star-1" title="1 star">
      <i class="active fa fa-star"></i>
    </label>
  </div>
<button id="publish-btn" class="btn btn-light">Publicar</button>
<br><br>

</div>`;

let warningLoggedOut = 
`<div class="alert-danger" role="alert">
<p>Debes <a href="index.html">Iniciar sesión</a> para escribir un comentario.</p>
</div>`;

  let writeComment = document.getElementById("write-comment");
  if(isLogged())
  {
    writeComment.innerHTML = succefulLoggedUser;
    //Enviar mensaje
    document.getElementById("publish-btn").addEventListener("click", function(e)
{
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  let newComment = {score: document.querySelector('input[name="rating"]:checked').value, 
                  description: document.getElementById("text-comment").value, 
                  user: getName(),
                  dateTime: dateTime};
  commentArray.push(newComment);
  showComments(commentArray);
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  commentAuth ();
  
});
  }else{
    writeComment.innerHTML = warningLoggedOut;
  }
}

//=====================================================================================

function showProductsRelated(data) {
  let htmlContentToAppend = "<p>Productos relacionados</p>";
  
  

  for (let i = 0; i < relatedArray.length; i++) {
    

    if (data.relatedProducts.indexOf(i) != -1) {
      let product = relatedArray[i];
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
  document.getElementById("related-products-display").innerHTML = htmlContentToAppend;
}
