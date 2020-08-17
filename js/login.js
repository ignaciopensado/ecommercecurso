

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

var usuario = document.getElementById("user");
var contra = document.getElementById("pass");

function acceder() {
    if (usuario.value.trim() === "") {
        alert("Debe ingresar un usuario!!")
    }
    else if (contra.value.trim() === "") {
        alert("Debe ingresar una contraseña!!")
    }
    else {
        if(usuario.value.length > 0 && contra.value.length > 0) {
            window.replace = "index.html";
        }
    }

}