document.addEventListener("DOMContentLoaded", function(e){
let getLocalStorage = window.localStorage;
let name = getLocalStorage.getItem("name");
let htmlContentToAppend = "";
if(name != undefined){
    htmlContentToAppend = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    `+"Bienvenido/a "+name+`
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" id="disconnect">Desconectarse</a>
    </div>
  </div>`
    document.getElementById("userIdentity").innerHTML = htmlContentToAppend;
    document.getElementById("disconnect").addEventListener("click", function(e){
      getLocalStorage.clear();
      window.location.href = "index.html"
    });
}

});