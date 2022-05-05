const productos = JSON.parse(localStorage.getItem("productosMujeres"));

const templateProd = document.getElementById("template-prod").content;
const contenedorProd = document.querySelector(".contenedor-productos");
const fragment = document.createDocumentFragment();

// TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
Object.values(productos).forEach((producto) => {
  templateProd.querySelector(".div-info .nombre-prod").textContent =
    producto.nombreProducto;
  templateProd.querySelector(".div-precio-boton .precio").textContent =
    producto.precio;
  templateProd
    .querySelector(".contenedor-img img")
    .setAttribute("alt", producto.nombreProducto);
  templateProd
    .querySelector(".contenedor-img img")
    .setAttribute("src", producto.img);
  const clone = templateProd.cloneNode(true);
  fragment.appendChild(clone);
});
contenedorProd.appendChild(fragment);

// TODO LO RELACIONADO AL CARRITO DE COMPRA
let carrito = {};
const templateTabla = document.getElementById(
  "agregar-producto-al-carro"
).content;
const tbodyCarrito = document.getElementById("carrito-body");
const fragmentTabla = document.createDocumentFragment();
const templateFoot = document.getElementById("tfooter").content;
const tfootCarrito = document.getElementById("footer");

contenedorProd.addEventListener("click", (e) => {
  if (e.target.textContent === "Agregar") {
    setCarrito(e.target.parentElement.parentElement);
  }
  e.stopPropagation();
});
const setCarrito = (e) => {
  const pivoteCarrito = {
    nombre: e.querySelector(".div-info .nombre-prod").textContent,
    precio: e.querySelector(".div-precio-boton .precio").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(pivoteCarrito.nombre)) {
    carrito[pivoteCarrito.nombre].cantidad += 1;
  } else {
    carrito[pivoteCarrito.nombre] = { ...pivoteCarrito };
  }
  pintarTabla(carrito);
};

const pintarTabla = (objetoCarrito) => {
  Object.values(objetoCarrito).forEach((objeto) => {
    const cloneTabla = templateTabla.cloneNode(true);
    cloneTabla.getElementById("producto").textContent = objeto.nombre;
    cloneTabla.getElementById("cant").textContent = objeto.cantidad;
    cloneTabla.getElementById("precio-uni").textContent = objeto.precio;
    let precioTotal = parseFloat(objeto.precio) * objeto.cantidad;
    cloneTabla.getElementById("precio-total-prod").textContent =
      precioTotal.toFixed(2);
    fragmentTabla.appendChild(cloneTabla);
  });
  tbodyCarrito.innerHTML = "";
  tbodyCarrito.appendChild(fragmentTabla);
  pintarFooter();
};
const pintarFooter = () => {
  tfootCarrito.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    tfootCarrito.innerHTML =
      "<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>";
  } else {
    const total = Object.values(carrito).reduce(
      (acc, { cantidad, precio }) => acc + cantidad * precio,
      0
    );
    templateFoot.getElementById("total-a-pagar").textContent = total.toFixed(2);
    const cloneFoot = templateFoot.cloneNode(true);
    fragment.appendChild(cloneFoot);
    tfootCarrito.appendChild(fragment);
    //Boton Vaciar carrito
    const botonVaciar = document.getElementById("vaciar-tabla");
    botonVaciar.addEventListener("click", () => {
      carrito = {};
      pintarTabla(carrito);
      pintarFooter();
    });

    //Botones aumentar y disminuir cantidades
  }
};
tbodyCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    aumentarDisminuir(e.target);
  }
});
const aumentarDisminuir = (boton) => {
  if (boton.textContent === "+") {
    const indicador =
      boton.parentElement.parentElement.firstElementChild.textContent;
    Object.values(carrito).forEach((elemento) => {
      if (elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad++;
      }
    });
  }
  if (boton.textContent === "-") {
    const indicador =
      boton.parentElement.parentElement.firstElementChild.textContent;
    Object.values(carrito).forEach((elemento) => {
      if (elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad--;
        if (carrito[elemento.nombre].cantidad === 0) {
          delete carrito[elemento.nombre];
        }
      }
    });
  }
  pintarTabla(carrito);
  pintarFooter();
};