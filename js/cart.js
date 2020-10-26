function primerLogueo() {
    if (localStorage.length === 0)
        window.location = 'login.html';
}

const CART_DESAFIATE_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
//CART_INFO_URL para la entrega inicial

//arreglo que copia al json, con los articulos
var articulos = [];

//arreglo con los costos de cada articulo individualmente
var costo = [];



//función para mostrar los artículos
function mostrarArticulos(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];
        costo[i] = articulo.unitCost;

        htmlContentToAppend += `
        <div id= "divArt" class="card" style="height: 20.5rem; width: 65rem;">

        <p>
        <h1 style="margin-left: 20px;">${articulo.name}</h1>
        <img src=${articulo.src} class="achicar" style="margin-left: 20px;">
        <h4 style="margin-left: 20px;">Cantidad: <input onchange="actualizarCant(this.value);" value="${articulo.count}" style="width: 8%;"></input> (${articulo.unitCost} ${articulo.currency} por unidad)</h4>
        <h4 style="margin-left: 20px;">SUBTOTAL: <span id="subT" name="cant">${articulo.unitCost * articulo.count}</span> ${articulo.currency}<span id="dolares"></span><button type="button" class="btn btn-danger" style="float: right; margin-right: 5px;" onclick="quitarElemento();">QUITAR</button></h4>
        </p>
        
        </div>
        <br>
        <br>
        `;
        document.getElementById("divArticulo").innerHTML = htmlContentToAppend;
        //cargo un total inicial
        document.getElementById("total").innerHTML = (parseFloat(document.getElementById("subT").innerHTML) + parseFloat(document.getElementById("subT").innerHTML) * 0.15)/40; 
    }
}

//funcion para calcular el total, junto al costo del envio, en dólares
function calcularTotal(total){
    if(total == undefined){
        total = 0;
    }
    else{   
        if(document.getElementById("elPremium").checked){
                total = (parseFloat(total) + (parseFloat(total)*0.15))/40;
        } 
        else 
            if(document.getElementById("elExpress").checked){
                total = (parseFloat(total) + (parseFloat(total)*0.07))/40;
        }
        else{
            /*if(document.getElementById("elStandard").checked)*/
                total = (parseFloat(total) + (parseFloat(total)*0.05))/40;
        }
        return total;
    }
}


//función para modificar a tiempo real la página, al cambiar la cantidad del elemento
function actualizarCant(unidades) {
    if(unidades==undefined){
        const subtot = document.getElementById("subT").innerHTML;
        document.getElementById("total").innerHTML = calcularTotal(subtot);  
    }
    else{
        document.getElementById("subT").innerHTML = unidades * costo[0];
        const subtot = document.getElementById("subT").innerHTML;
        document.getElementById("total").innerHTML = calcularTotal(subtot);
    }
}

//función para chequear si los campos de la ventana modal fueron bien seleccionados
function controlarPago(){
    if(document.getElementById("elCredito").checked){
        if(document.getElementById("modalNumeroC").value.length  == 0 || document.getElementById("modalCodigoC").value.length  == 0 || document.getElementById("modalVencimientoC").value.length  == 0){
            alert("Complete los campos correspondientes!!");
        }
        else
            document.getElementById("pagoElegido").innerHTML = `Crédito`;
    }
    else if(document.getElementById("laTransferencia").checked){
        if(document.getElementById("modalCuentaT").value.length  == 0){
            alert("Complete el campo correspondiente!!");
        }
        else
            document.getElementById("pagoElegido").innerHTML = `Transferencia Bancaria`;
    }
    else{
        alert("Debe seleccionar un tipo de pago, y completar los campos correspondientes.");
    }


}

//función para chequear si los campos del envío fueron bien completados, y además se eligió un tipo de pago a través de la ventana modal
function esValidoForm(){
    if(document.getElementById("pagoElegido").innerHTML == ""){
        alert("Aún no ha seleccionado un método de pago valido!!")
        return false;
    }
    else
        return true;
}

//función para eliminar un elemento del carrito
function quitarElemento(){
    //actualizo el total
    actualizarCant(0);
    //elimino el contenedor de ese artículo en particular
    var elDiv = document.getElementById("divArt");
    elDiv.parentElement.removeChild(elDiv);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data;
            mostrarArticulos(articulos.articles);
        }
    });

});
