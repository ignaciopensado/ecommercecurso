//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  

});

function redirigirAlIndex() {
    window.location = 'index.html';
}

function acceder() {
    var usuario = document.getElementById("user").value;
    var contra = document.getElementById("pass").value;
    if (usuario.trim() === "") {
        alert("Debe ingresar un usuario!!")
    }
    else if (contra.trim() === "") {
        alert("Debe ingresar una contraseña!!")
    }
    else {
        if(usuario.length > 0 && contra.length > 0) {
            redirigirAlIndex();
        }
    }

}

 function guardarDatosEnLS() {
    var usuario = document.getElementById("user").value;
    var contra = document.getElementById("pass").value;
    
    //obtengo usuario y contraseña, ahora los cargo al localStorage
    localStorage.setItem("El_Usuario", usuario);
    localStorage.setItem("La_Contrasena", contra);
}

function vaciarLS() {
    localStorage.clear();
}


