const urlDolar = "https://criptoya.com/api/dolar";
const costoDolar = document.getElementById("costoDolar");

const dolarCalc = ()=>{
fetch(urlDolar)
    .then(respuesta => respuesta.json())
    .then(({oficial})=>{
        const cotPropia = ((oficial)+ 20).toFixed(0);
        sessionStorage.setItem("cotPropiaJson", JSON.stringify(cotPropia));
        costoDolar.innerHTML=`
                            <h3>La cotizacion del dolar es: </h3>
                            <h3>AR$ ${cotPropia}.-</h3>
                            `                   
    }).catch(error=>console.error(error))
}
dolarCalc()    
setInterval(()=>{
    dolarCalc();
}, 120000)


const cotPropiaJson = sessionStorage.getItem("cotPropiaJson");
const dolarParaCalculo =parseInt(JSON.parse(cotPropiaJson));



class Cliente {
    constructor(nombre, edad, cantDias, telefono, email, nacionalidad, destino) {
    this.nombre = nombre;
    this.edad = edad;
    this.cantDias = cantDias;
    this.telefono = telefono;
    this.email = email;
    this.nacionalidad = nacionalidad;
    this.destino = destino;
    }
}
const arrayClientes = [];
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    const edad = document.getElementById("edad");
    const nacionalidad = document.getElementById("nacionalidad");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const destino = document.getElementById("destino");
    function calculoDias() {
        const fechaIni = document.getElementById("fechaIni");
        const fechaFin = document.getElementById("fechaFin");
        let fI = new Date(fechaIni.value).getTime();
        let fF = new Date(fechaFin.value).getTime();
        let fR = (fF - fI) / (1000 * 60 * 60 * 24);
        return fR;
    }
    let cantDias = calculoDias();
    const cliente = new Cliente(
        nombre.value,
        edad.value,
        cantDias,
        telefono.value,
        email.value,
        nacionalidad.value,
        destino.value
    );
    arrayClientes.push(cliente);
    formulario.reset();
    for (let i = 0; i < arrayClientes.length; i++) {
        mostrarCliente();
        costoPorEdad();
        filtroProductos();
        mostrarProd();
    }
});
const sldCot = document.getElementById("sldCot");
const formularioParaCliente = document.getElementById("formularioParaCliente");
const tarjetaCliente = document.getElementById("tarjetaCliente");
const mostrarCliente = () => {
    sldCot.innerHTML = "";
    formularioParaCliente.innerHTML = "";
    arrayClientes.forEach((cliente) => {
        const card = document.createElement("div");
        card.innerHTML = `
                                <div id="tarjCliente" class="tarjCliente">
                                    <h1>Hola ${cliente.nombre}</h1>
                                    <h2>El destino que elegiste es ${cliente.destino}</h2>
                                    <h2>Nuestras propuesta para vos son </h2>
                                </div>
                                `;
            tarjetaCliente.appendChild(card);
        });
};
let costoPorEdad = () => {
arrayClientes.forEach((cliente) => {
    if (cliente.edad < 18) {
        costoPorEdad = 1.1;
    } else if (cliente.edad >= 18 && cliente.edad < 35) {
        costoPorEdad = 1.15;
    } else {
        costoPorEdad = 1.2;
    }
    });
};

const productoArray =[];    
const prodJson = "productos.json"
fetch(prodJson)
    .then(respuesta => respuesta.json())
    .then(datos=>{
        datos.forEach (producto=>{
            productoArray.push(producto);
        })
    })

const arrayProductosPrecioFinal = [];
let filtroProductos = () => {
arrayClientes.forEach((cliente) => {
    let productoFiltrado = productoArray.filter(
        (viaje) => viaje.destCober === cliente.destino
    );
    let arrayPrecioCalc = productoFiltrado.map((producto) => {
        return {
            id: producto.id,
            empresa: producto.empresa,
            logo: producto.logo,
            detalle: producto.detalle,
            prodNom: producto.prodNom,
            destCober: producto.destCober,
            costPorDia: (((producto.costPorDia *cliente.cantDias *costoPorEdad))*dolarParaCalculo).toFixed(0),
        };
    });
    arrayPrecioCalc.forEach((i) => {
        arrayProductosPrecioFinal.push(i);
        sessionStorage.setItem(
        "arrayProdJson",
        JSON.stringify(arrayProductosPrecioFinal)
        );
    });
    });
};

    let prodElegido = [];
const contProd = document.getElementById("contProd");
const mostrarProd = () => {
arrayProductosPrecioFinal.forEach((i) => {
    const card = document.createElement("div");
    card.innerHTML = `
                                    <div class="tarjProd">
                                    <img src="${i.logo}" alt="${i.nombre}">
                                    <div class="detCard">
                                        <h3>Empresa: ${i.empresa}</h3>
                                        <h3>Plan: ${i.prodNom}</h3>
                                        <h3>Precio: AR$${i.costPorDia}</h3>
                                    </div>
                                    <div class="btnProdSelect">
                                        <button class="btn1" id="boton${i.id}" >Seleccionar Plan</button>
                                        <button class="btn2" id="detalle${i.detalle}">Ver Detalle</button>
                                    </div>
                                    </div>
                                    `;
    contProd.appendChild(card);

    const boton = document.getElementById(`boton${i.id}`);
    boton.addEventListener("click", () => {
        agregarProdElejido(i.id);
    });

    const detalleProducto = document.getElementById(`detalle${i.detalle}`);
    detalleProducto.addEventListener("click", () => {
        mostrarDetalle(i.detalle);
    });

    boton.addEventListener("click", () => {
        prodFinal();
    });
    });
};

const agregarProdElejido = (id) => {
    const producto = arrayProductosPrecioFinal.find(
        (producto) => producto.id === id
    );
        prodElegido.push(producto);
};

const prodFiltrados = document.getElementById("prodFiltrados");
const prodFinal = () => {
    for (let i = 0; i < prodElegido.length; i++) {
    contProd.innerHTML = "";
    tarjCliente.innerHTML = `<div class="tarjCliente">
                            <h2>Gracias por elegirnos!!</h2>
                            <h2>Que disfrutes tu viaje!!</h2>
                            </div>
                            <button class="btn3" id="btnCotizador">Volver a elegir</button>
                            `;
    prodElegido.forEach((i) => {
        const card = document.createElement("div");
        card.innerHTML = `
                            <div class="tarjProd">
                            <img src="${i.logo}" alt="${i.nombre}">
                            <div class="detCard">
                                <h3>Empresa: ${i.empresa}</h3>
                                <h3>Plan: ${i.prodNom}</h3>
                                <h3>Precio: $${i.costPorDia}</h3>
                            </div>
                            <div class="btnProdSelect">
                            <a class="btnPagar" href="./pagos.html"><button class="btn1" id="boton${i.id}">Pagar</button></a>
                                <button class="btn2" id="detalle${i.detalle}">Ver Detalle</button>
                            </div>
                            </div>
                            `;
        prodFiltrados.appendChild(card);

        const detalleProducto = document.getElementById(`detalle${i.detalle}`);
            detalleProducto.addEventListener("click", () => {
            mostrarDetalle(i.detalle);
        });
        


        const boton = document.getElementById(`btnCotizador`);
        boton.addEventListener("click", () => {
            traerArrayJson();
            volverMostrar();
        });
        });
    }
};

const traerArrayJson = () => {
    arrayProductosPrecioFinal.length = 0;
    prodElegido.pop();
    const arrayJson = sessionStorage.getItem("arrayProdJson");
    const arrayParse = JSON.parse(arrayJson);
    arrayParse.forEach((i) => {
        arrayProductosPrecioFinal.push(i);
    });
};

const volverMostrar = () => {
    arrayProductosPrecioFinal.forEach((i) => {
        prodFiltrados.innerHTML = "";
        tarjCliente.innerHTML = `<div class="tarjCliente">
                                        <h2>Cambiaste de opinion??</h2>
                                        <h2>Aca esta nuestra seleccion de productos para vos!</h2>
                                        </div>
                `;
        const card = document.createElement("div");
        card.innerHTML = `
                                    <div class="tarjProd">
                                    <img src="${i.logo}" alt="${i.nombre}">
                                    <div class="detCard">
                                        <h3>Empresa: ${i.empresa}</h3>
                                        <h3>Plan: ${i.prodNom}</h3>
                                        <h3>Precio: $${i.costPorDia}</h3>
                                    </div>
                                    <div class="btnProdSelect">
                                        <button class="btn1" id="boton${i.id}" >Seleccionar Plan</button>
                                        <button class="btn2" id="detalle${i.detalle}" >Ver Detalle</button>
                                    </div>
                                    </div>
                                    `;
        contProd.appendChild(card);

    const boton = document.getElementById(`boton${i.id}`);
    boton.addEventListener("click", () => {
        agregarProdElejido(i.id);
    });
    
    const detalleProducto = document.getElementById(`detalle${i.detalle}`);
    detalleProducto.addEventListener("click", () => {
    mostrarDetalle(i.detalle);
    });
    
    boton.addEventListener("click", () => {
        prodFinal();

    });
    });
};

const mostrarDetalle = (detalle) => {
    const detProd = arrayProductosPrecioFinal.find(
        (producto) => producto.detalle === detalle
    );
    Swal.fire({
        confirmButtonText: false,
        imageUrl: detProd.detalle,
        showCancelButton: false, 
        showConfirmButton: false,
        backdrop: `
                rgba(10, 48, 115, 0.44);
                    `,
    });
};
