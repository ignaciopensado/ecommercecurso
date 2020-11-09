var listaPerfil=[];
var datosPerfil=[];

//función para validar los campos ((TOMADA DE BOOTSTRAP)), cuando hago submit al presionar el button chequea si los campos son válidos, 
//y lo muestra a través de estilos.
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function asignarPerfil(){
        //defino el objeto
        var datos={}; 

        //obtengo los valores
        var nombre=document.getElementById('validacionNombre').value;
        var apellido=document.getElementById('validacionApellido').value;
        var correo=document.getElementById('validacionCorreo').value;
        var edad=document.getElementById('validacionEdad').value;
        var telefono=document.getElementById('validacionTelefono').value;
        var pais=document.getElementById('validacionPais').value;
        var provincia=document.getElementById('validacionProvincia').value;

        //guardo los valores
        datos.nombre = nombre;
        datos.apellido = apellido;
        datos.correo = correo;
        datos.edad = edad;
        datos.telefono = telefono;
        datos.pais = pais;
        datos.provincia = provincia;
                    
        //agrego los valores al final de la colección
        listaPerfil.push(datos);

        //////////////USO STRINGIFY///////////////////////////////////
        window.localStorage.setItem('perfil', JSON.stringify(listaPerfil));
}

function guardarDatos(){
        if(localStorage.getItem("perfil") === null){
            asignarPerfil();
        }
        else{
            //primero debo eliminar los rastros del perfil anterior, si existe
            window.localStorage.removeItem('perfil');
            asignarPerfil();
        }
   
}

function chequearDatos(){
        ////////////USO PARSE
        datosPerfil = JSON.parse(window.localStorage.getItem('perfil'));

        //Asigno valores a los input, por defecto
        document.getElementById('validacionNombre').value = datosPerfil[0].nombre;
        document.getElementById('validacionApellido').value = datosPerfil[0].apellido;
        document.getElementById('validacionCorreo').value = datosPerfil[0].correo;
        document.getElementById('validacionEdad').value = parseInt(datosPerfil[0].edad);
        document.getElementById('validacionTelefono').value = parseInt(datosPerfil[0].telefono);
        document.getElementById('validacionPais').value = datosPerfil[0].pais;
        document.getElementById('validacionProvincia').value = datosPerfil[0].provincia;
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    chequearDatos();
});