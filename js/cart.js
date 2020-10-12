function primerLogueo() {
    if (localStorage.length === 0)
        window.location = 'login.html';
}

const CART_DESAFIATE_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
//CART_INFO_URL para la entrega inicial
var articulos = [];
var costo = [];


function mostrarArticulos(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];
        costo[i] = articulo.unitCost;
        htmlContentToAppend += `
        <div class="card" style="height: 20rem; width: 65rem;">

        <p>
        <h1 style="margin-left: 20px;">${articulo.name}</h1>
        <img src=${articulo.src} class="achicar" style="margin-left: 20px;">
        <h4 style="margin-left: 20px;">Cantidad: <input onchange="actualizar(this.value);" id="cant" value="${articulo.count}" style="width: 8%;"></input> (${articulo.unitCost} ${articulo.currency} por unidad)</h4>
        <h4 style="margin-left: 20px;">SUBTOTAL: <span id="subT">${articulo.unitCost * articulo.count}</span> ${articulo.currency}<span id="dolares"></span></h4></p>
   
        </div>
        <br>
        <br>
        `;
        document.getElementById("divArticulo").innerHTML = htmlContentToAppend;

    }

}


function actualizar(unidades) {
    document.getElementById("subT").innerHTML = unidades * costo[0];
}
       


function mostrarEnvio() {
    document.getElementById("divEnvio").innerHTML = `
        <hr/>
        <br>
        <br>        
        <h2>Tipo de envío</h2>
        <input type="radio" id="elPremium" name="tipoEnvio" value="premium" checked>
        <label for="elPremium">Premium (2-5 días) - Costo del 15%</label>
        <br>
        <input type="radio" id="elExpress" name="tipoEnvio" value="premium">
        <label for="elExpress">Express (5-8 días) - Costo del 7%</label>
        <br>
        <input type="radio" id="elStandard" name="tipoEnvio" value="premium">
        <label for="elStandard">Standard (12-15 días) - Costo del 5%</label>
        <br>
        <br>
        <hr/>
        <h2>Dirección del envío</h2>
        <p>Calle: <input></input>   Número de puerta: <input type="number"></input></p>
        <p>Esquina: <input></input></p>
        <p>País: <input></input></p>     
        <p>Estado/Provincia: <input></input></p>
        <p>Código postal: <input type="number"></input></p>
        <p>Teléfono: <input type="number"></input></p>
        <br>
        <hr/>
        <h3>Total: (subtotal + tipo de envio)<span id="total"><span></h3>
        <button type="button" class="btn btn-secondary">Seleccione el método de pago</button>
        <br>
        <br>
        <hr/>
        <button type="button" class="btn btn-success" style="margin:auto; display:block;">COMPRAR</button>
    `;
}
  


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data;
            mostrarArticulos(articulos.articles);
            mostrarEnvio();
        }
    });
    document.getElementById("cant").addEventListener('change', actualizar);
});