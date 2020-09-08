var getLocalStorage = window.localStorage;
var user = JSON.parse(getLocalStorage.getItem("user-logged"));
var htmlContentToAppend = "";
document.addEventListener("DOMContentLoaded", function (e) {



  if (isLogged()) {
    htmlContentToAppend = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    `+ "Bienvenido/a " + getName() + `
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" id="my-profile">Mi perfil</a>
      <a class="dropdown-item" id="disconnect">Desconectarse</a>
    </div>
  </div>`
    document.getElementById("userIdentity").innerHTML = htmlContentToAppend;
    document.getElementById("disconnect").addEventListener("click", function (e) {
      getLocalStorage.clear();
      window.location.href = "index.html"
    });
    document.getElementById("my-profile").addEventListener("click", function (e) {
      window.location.href = "my-profile.html"
    });
  } else {
    htmlContentToAppend = `<div class="py-2 d-none d-md-inline-block">
  <p class="text-danger">Debes <a href="index.html">Iniciar sesión</a></p>
  </div>`;
    document.getElementById("userIdentity").innerHTML = htmlContentToAppend;
  }

});

function isLogged() {
  return user != undefined;
}
function getName() {
  if (isLogged()) { return user.username; }

}