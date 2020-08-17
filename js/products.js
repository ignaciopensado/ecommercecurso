fetch(PRODUCTS_URL)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            document.getElementById('eljson').innerHTML = construirProductos(datos);
        })
        .catch(error=>alert("Ocurrió un error: " + error));

function construirProductos(info){
    var tabla = document.getElementById('latabla')
    for(var i=0; i<info.length; i++){
        var fila = `<tr class="bordeabajo">
                        <h1>${info[i].name} - <i>${info[i].currency} ${info[i].cost}</i></h1>                                       
                        <img class="achicar" src="${info[i].imgSrc}"</img> 
                        <p>${info[i].description}</p>                      
                        <p class="vendidos">${info[i].soldCount} vendidos.</p>       
                    </tr>
                   `
        tabla.innerHTML += fila;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});