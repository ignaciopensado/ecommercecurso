const ORDEN_NORMAL = "Normal";
const ORDEN_POR_SOLD_COUNT = "Cant.";
const ORDEN_DESC_POR_COST = "+ a -";
const ORDEN_ASC_POR_COST = "- a +";

var currentProductsArray = [];
var currentSortCriterio = undefined;

var cotaMin = undefined;
var cotaMax = undefined;


function primerLogueo() {
    if(localStorage.length === 0){
        window.location = 'login.html';
    }
}

function mostrarUserEnBoton(){
    document.getElementById("bdropd").innerHTML = localStorage.getItem("El_Usuario");
}
//FUNCION PARA ORDENAR ARREGLO
function ordenarCat(criterio, arreglo) {
    let result = [];
    //si el criterio es el normal, muestro como viene
    if (criterio === ORDEN_NORMAL) {
        result = arreglo;
    } 
    //si el criterio son los vendidos...
    else if (criterio === ORDEN_POR_SOLD_COUNT) {
        result = arreglo.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    }
    //si el criterio es descendente por precio...
    else if (criterio === ORDEN_DESC_POR_COST) {
        result = arreglo.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    }
    //si el criterio es ascendente por precio...
    else if (criterio === ORDEN_ASC_POR_COST) {
        result = arreglo.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    }
    return result;
}


//FUNCION PARA MOSTRAR LOS PRODUCTOS
function showCategoriesList() {
    let htmlParaAnexar = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let producto = currentCategoriesArray[i];
        //chequeo si quiero mostrar acotado
        if (((cotaMin == undefined) || (cotaMin != undefined && parseInt(producto.cost) >= cotaMin)) &&
            ((cotaMax == undefined) || (cotaMax != undefined && parseInt(producto.cost) <= cotaMax))) {
                 htmlParaAnexar += `
                        <br>
                        <div class="borde" id="divPH" title="IR AL PRODUCTO">
                        <a id="ingresoAPI" href="product-info.html">
                            <h1>${producto.name} - <i>${producto.currency} ${producto.cost}</i></h1>                                             
                            <p style="font-size:22px;"><img class="achicar" src="${producto.imgSrc}"  title="CLICK para agregar al Carrito"</img> ${producto.description}</p>                      
                            <p class="vendidos">${producto.soldCount} vendidos.</p>
                        </a>
                        </div>       
                        <br>
                   `
        }
        document.getElementById("interno").innerHTML = htmlParaAnexar;
    }
}


//FUNCION QUE COMBINA AMBAS
function sortAndShowCategories(sortCriterio, categoriesArray) {
    currentSortCriterio = sortCriterio;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = ordenarCat(currentSortCriterio, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
       if (resultObj.status === "ok") {
           sortAndShowCategories(ORDEN_NORMAL, resultObj.data);
       }
   });
    
   document.getElementById("ordenarPorVendidos").addEventListener("click", function () {
            sortAndShowCategories(ORDEN_POR_SOLD_COUNT);
    });
    
    document.getElementById("bOpcion").addEventListener("click", function () {
        if(document.getElementById("opciones").value == "desc"){
            sortAndShowCategories(ORDEN_DESC_POR_COST);
        }
        else{
            sortAndShowCategories(ORDEN_ASC_POR_COST);
        }
    });
    
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        cotaMin = document.getElementById("rangeFilterCountMin").value;
        cotaMax = document.getElementById("rangeFilterCountMax").value;

        if ((cotaMin != undefined) && (cotaMin != "") && (parseInt(cotaMin)) >= 0) {
            cotaMin = parseInt(cotaMin);
        } else {
            cotaMin = undefined;
        }

        if ((cotaMax != undefined) && (cotaMax != "") && (parseInt(cotaMax)) >= 0) {
            cotaMax = parseInt(cotaMax);
        } else {
            cotaMax = undefined;
        }

        showCategoriesList();
    });
    
    document.getElementById("buscar").addEventListener("click", function () {
                var texto = document.getElementById("barra").value;
                window.find(texto);
     });

    document.getElementById("buscar").addEventListener("click", function () {

    });

});




