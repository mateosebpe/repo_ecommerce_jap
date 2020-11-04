const form = document.getElementById('profile-info');
const default_img = 'https://th.bing.com/th/id/OIP.tHluP4chQzW31oRhD-mqogHaHa?pid=Api&rs=1';
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let localStorage = window.localStorage;
    let profile_data = JSON.parse(localStorage.getItem('profile_data'));
    if (profile_data != undefined) {
        document.getElementById('iname').value = profile_data.name;
        document.getElementById('ilastname').value = profile_data.lastname;
        document.getElementById('iurl').value = profile_data.photo;
        document.getElementById('iage').value = profile_data.age;
        document.getElementById('itel').value = profile_data.tel;
        document.getElementById('iemail').value = profile_data.email;
        if (profile_data.photo != "") {
            setProfileImg(profile_data.photo);
        } else {
            setProfileImg(default_img);
        };
    } else {
        setProfileImg(default_img);
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
        let new_profile_data = {
            name: document.getElementById('iname').value,
            lastname: document.getElementById('ilastname').value,
            photo: document.getElementById('iurl').value,
            age: document.getElementById('iage').value,
            tel: document.getElementById('itel').value,
            email: document.getElementById('iemail').value
        };
        localStorage.removeItem('profile_data');
        localStorage.setItem('profile_data', JSON.stringify(new_profile_data));
        if (new_profile_data.photo != "") {
            setProfileImg(new_profile_data.photo);
        } else {
            setProfileImg(default_img);
        };
        let options = { placement: 'right', container: 'body', title: '¡Se han guardado los datos!', content: "Proceso realizado con éxito." }
        $('#success_btn').popover(options);
        $('#success_btn').popover('enable').popover('show');
        setTimeout(() => { $('#success_btn').popover('hide').popover('disable'); }, 3000);
    
    }

    form.classList.add('was-validated');
});


function setProfileImg(url) {
    document.getElementById('profile_img').src = url;
}