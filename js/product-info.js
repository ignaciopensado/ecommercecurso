var producto = {};
var arrComentarios = {};
var arrPRelacionados = {};
var pUsuario = undefined;

function primerLogueo() {
    if (localStorage.length === 0)
        window.location = 'login.html';
}


function mostrarProd() {
    //primero muestro los datos del producto
    let htmlContentToAppend = "";
    htmlContentToAppend = `<h1 style="text-align: center;">${producto.name}</h1>
    <h3 style="text-align:center;"><span class="negrita">Precio: </span>${producto.currency} ${producto.cost}</h3>
    <p><span class="negrita">Descripción: </span>${producto.description}</p> <h5 style="text-align: right;">Vendidos: ${producto.soldCount}</h5>
    `
    document.getElementById("elcontenedor").innerHTML = htmlContentToAppend;
}

function mostrarRelacionados() {
    let htmlContentToAppend = "";
    for (let i = 0; i < producto.relatedProducts.length; i++) {
        let indiceRP = producto.relatedProducts[i]; //aca almaceno el indice del auto relacionado
        
        let encontrado = false;
        let j = 0;
        while ( (j < arrPRelacionados.length) && (encontrado==false) ) {
            if (indiceRP == j) { //aca me fijo si ese indice que almacene, es el mismo auto que estoy parado dentro del arreglo de productos
                let elrelacionado = arrPRelacionados[j];
                htmlContentToAppend +=
                            `
                           <a href="product-info.html" style="color: black">
                                <h3>${elrelacionado.name}</h3>                                             
                                <p style="font-size:22px;"><img class="img-fluid img-thumbnail" style="width: 150px; 
                                    margin-left: auto; margin-right: auto; display: block;" src="${elrelacionado.imgSrc}"  
                                title="CLICK para ir al producto."</img></p> 
                                <p>${elrelacionado.description}</p>                      
                            </a>
                      `;
                document.getElementById("relacionados").innerHTML = htmlContentToAppend;
                encontrado = true;
            }
            j++;
        }
    }

}

function mostrarImg(array) {
    var i = 0;
    var imagenes = "";
    array.forEach(elemento => {

        if (i == 0) {
            imagenes += "<div class='carousel-item active'>  <img class='dblock w-50'  src=" + elemento + " alt='" + elemento + "' width=50 height=300> </div>";
        } else {
            imagenes += "<div class='carousel-item '>  <img class='dblock w-50'  src=" + elemento + " alt='" + elemento + "' width=50 height=300> </div>";
        }
        i++;
    });
    document.getElementById('imagenes').innerHTML = imagenes;
}

function puntajeAEstrellas(comentario) {
    let puntaje = comentario.score;
    let estrellitas = "";
    for (let i = 0; i < puntaje; i++) {
        estrellitas += `<i class="fas fa-star" style="color: orange"> </i> `;
    }
    return estrellitas;
}

function mostrarComentarios(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];
        htmlContentToAppend += ` 
        <div class="recuadro" style="text-align: left;">
        <h2><span class="usuario">${comentario.user}</span> <span class="fecha" style="text-align: right;">Fecha: ${comentario.dateTime}</span> </h2> 
        <h4><i style="text-decoration: underline">Puntuación:</i>  ${puntajeAEstrellas(comentario)}</h4> <p>${comentario.description}</p>
        </div>
        `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}


function agregarComentario() {
    let comentario = {
        "score": undefined,
        "description": undefined,
        "user": undefined,
        "dateTime": undefined
    };

    comentario.score = pUsuario;
    comentario.description = document.getElementById("elcomentario").value;
    comentario.user = localStorage.getItem("El_Usuario");
    comentario.dateTime = new Date();

    if (pUsuario == undefined) {
        alert("Debe ingresar un puntaje!!")
    } else if (comentario.description == "") {
        alert("No ha ingresado ningún comentario!!")
    } else {
        arrComentarios.push(comentario);
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;

            //Muestro los (en este caso EL) producto
            mostrarProd();
            //agrego las imagenes
            mostrarImg(producto.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrComentarios = resultObj.data;
            mostrarComentarios(arrComentarios);
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {                      
            arrPRelacionados = resultObj.data;
            mostrarRelacionados();
        }
    });
    
    document.getElementById("elenvio").addEventListener("click", function () {
        agregarComentario();
        mostrarComentarios(arrComentarios);
    });


});
