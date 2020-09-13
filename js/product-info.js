var producto = {};
var arrComentarios = {};
var pUsuario = undefined;

function primerLogueo() {
    if (localStorage.length === 0)
        window.location = 'login.html';
}


function mostrarProd(){
    //primero muestro los datos del producto
    let htmlContentToAppend = "";
    htmlContentToAppend = `<h1 style="text-align: center;">${producto.name}</h1>
    <h3 style="text-align:center;"><span class="negrita">Precio: </span>${producto.currency} ${producto.cost}</h3>
    <p><span class="negrita">Descripción: </span>${producto.description}</p> <h5 style="text-align: right;">Vendidos: ${producto.soldCount}</h5>

    `
    document.getElementById("elcontenedor").innerHTML = htmlContentToAppend;

    //ahora muestro los relacionados
    let relHtmlContentToAppend = "";
    relHtmlContentToAppend = 
        `
        <div>
            <a href="product-info.html">    
                <img class="img-fluid img-thumbnail" style="width: 150px;"src="img/prod2.jpg" alt="" title="Fiat Way">
                <img class="img-fluid img-thumbnail" style="width: 150px;" src="img/prod4.jpg" alt="" title="Peugeot 208">
            </a>
        </div>
        `
    document.getElementById("relacionados").innerHTML = relHtmlContentToAppend;   
}

function mostrarImg(array) {

    let imgHtmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        imgHtmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("imagenes").innerHTML = imgHtmlContentToAppend;
    }
}

function puntajeAEstrellas(comentario){
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

    if(pUsuario == undefined){
        alert("Debe ingresar un puntaje!!")
    }
    else if(comentario.description == ""){
        alert("No ha ingresado ningún comentario!!")
    }
    else{
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
    
    document.getElementById("elenvio").addEventListener("click", function () {
        agregarComentario();
        mostrarComentarios(arrComentarios);
      });

});

