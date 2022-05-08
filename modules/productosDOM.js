const templateProd = document.getElementById("template-prod").content;
const fragment = document.createDocumentFragment();

export function productosDOM(productos) {
    Object.values(productos).forEach((producto) => {
        templateProd.querySelector(".div-info .nombre-prod").textContent = producto.nombreProducto;
        templateProd.querySelector(".div-precio-boton .precio").textContent = producto.precio;
        templateProd.querySelector(".contenedor-img img").setAttribute("alt", producto.nombreProducto);
        templateProd.querySelector(".contenedor-img img").setAttribute("src", producto.img);
        const clone = templateProd.cloneNode(true);
        fragment.appendChild(clone);
    });
    return fragment;
}