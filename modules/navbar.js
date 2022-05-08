export const navbar = (container) => {
    container.innerHTML = `
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="../../index.html">JAAO</a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="active"><a href="../../index.html">Home</a></li>
                    <li><a href="./pages/carrito.html">Productos</a></li>
                </ul>
            </div>
        </nav>
    `;
};
