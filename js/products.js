fetch(PRODUCTS_URL)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            document.getElementById('interno').innerHTML = construirProductos(datos);
        })
        .catch(error=>alert("Ocurrió un error: " + error));

function construirProductos(info){
    var eldiv = document.getElementById('contenedor');
    for(var i=0; i<info.length; i++){
        var linea = `    <br>
                        <div class="borde">
                            <h1>${info[i].name} - <i>${info[i].currency} ${info[i].cost}</i></h1>                                             
                            <p style="font-size:22px;"><button><img class="achicar" src="${info[i].imgSrc}" onclick="irAlCarrito();"</img></button>${info[i].description}</p>                      
                            <p class="vendidos">${info[i].soldCount} vendidos.</p>
                        </div>       
                        <br>
                   `
        eldiv.innerHTML += linea;
    }
}

function irAlCarrito(){
    window.location = 'cart.html';
}

function busqueda() {
   var b = document.getElementById("buscado");
   document.getElementById("barra").innerHTML = b.value;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});