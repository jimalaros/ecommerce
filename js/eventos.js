import { datos } from "../data/data.js";

const botonH = document.getElementById('productosHombres');
const botonM = document.getElementById('productosMujeres');

botonH.addEventListener("click", function (e) {
    e.preventDefault();
    const productosHombres = datos.filter(dato => dato.categoria === "MASCULINO");
    localStorage.setItem("productosHombres", JSON.stringify(productosHombres));

    window.location.href = '../pages/carritoHombres.html';
});

botonM.addEventListener("click", function (e) {
    e.preventDefault();
    const productosMujeres = datos.filter(dato => dato.categoria === "FEMENINO");
    localStorage.setItem("productosMujeres", JSON.stringify(productosMujeres));

    window.location.href = '../pages/carritoMujeres.html';
})