const usuario="admin";
const password ="1234";
const formLog = document.getElementById ("formLog");
formLog.addEventListener("submit", (e)=>{
    e.preventDefault();
    const user = document.getElementById("user");
    const pass = document.getElementById ("pass");
        if (user.value === usuario && pass.value === password){
            const loggin = document.getElementById("loggin");
            loggin.innerHTML = ``;
            const usuarioCorrecto = document.getElementById ("usuarioCorrecto");
            usuarioCorrecto.innerHTML =    `<div class="btnCTPrp2">
                                                <a href="carga_productos.html"><button class="btnCT2">Cargar Producto</button></a>
                                            </div>
                                            <div class="btnCTPrp2">
                                                <button class="btnCT2">Cerrar Sesion</button>
                                            </div>`
        }
        else{
            alert("Usuario o Contraseña incorrecta");        
        }
})
class Cliente{
    constructor (nombre, edad, cantDias,telefono, email, nacionalidad, destino){
        this.nombre = nombre;
        this.edad = edad;
        this.cantDias= cantDias; 
        this.telefono=telefono;
        this.email=email;
        this.nacionalidad=nacionalidad;
        this.destino=destino;
    }    }
const arrayClientes=[];
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
    for(let i =0; i<arrayClientes.length; i++){
        mostrarCliente();
        costoPorEdad();
        filtroProductos();
        mostrarProd()
        
    }})
const sldCot = document.getElementById ("sldCot");
const formularioParaCliente = document.getElementById("formularioParaCliente")
const tarjetaCliente = document.getElementById("tarjetaCliente")
const mostrarCliente = ()=> {
    sldCot.innerHTML="";
    formularioParaCliente.innerHTML="";
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
    })}
    let costoPorEdad = ()=>{
    arrayClientes.forEach((cliente)=>{
    if (cliente.edad< 18) {
        costoPorEdad = 1.1;
    } else if (cliente.edad >= 18 && cliente.edad < 35) {
        costoPorEdad = 1.15;
    } else {
        costoPorEdad = 1.2;
    }
})}
const arrayProductosPrecioFinal=[];
let filtroProductos = () =>{
    arrayClientes.forEach((cliente)=>{
        let productoFiltrado = productoArray.filter((viaje)=> viaje.destCober === cliente.destino );
        let arrayPrecioCalc = productoFiltrado.map((producto) => {
            return{
            id:producto.id,
            empresa: producto.empresa,
            logo:producto.logo,
            prodNom: producto.prodNom,
            destCober: producto.destCober,
            costPorDia: ((producto.costPorDia * cliente.cantDias) * costoPorEdad).toFixed(0),    
        } 
        
    })
    arrayPrecioCalc.forEach((i) => {
        arrayProductosPrecioFinal.push(i)
        sessionStorage.setItem("arrayProdJson", JSON.stringify(arrayProductosPrecioFinal));
    })}         
)}
class Producto{
    constructor(id, empresa, prodNom, destCober, costPorDia, logo){
        this.id= id;
        this.empresa = empresa;
        this.prodNom= prodNom;
        this.destCober=destCober;
        this.costPorDia = costPorDia;
        this.logo = logo;
    }
}
const tas1 = new Producto(1,"Tas", "Plan Tas 1" , "Europa" , 200, "logos/tas_logo.webp");
const tas2 = new Producto(2,"Tas", "Plan Tas 2" , "America del Sur" , 300, "logos/tas_logo.webp");
const tas3 = new Producto(3,"Tas", "Plan Tas 3" , "Asia" , 700, "logos/tas_logo.webp");
const tas4 = new Producto(4,"Tas", "Plan Tas 4" , "America del Norte" , 600, "logos/tas_logo.webp");
const tas5 = new Producto(5,"Tas", "Plan Tas 5" , "Africa" , 800, "logos/tas_logo.webp");
const tas6 = new Producto(6,"Tas", "Plan Tas 6" , "Oceania" , 500, "logos/tas_logo.webp");
const tas7 = new Producto(7,"Tas", "Plan Tas 7" , "Caribe" , 400, "logos/tas_logo.webp");
const tas8 = new Producto(8,"Tas", "Plan Tas 8" , "Turismo Interno" , 100, "logos/tas_logo.webp");
const assisto1 = new Producto(5,"Assisto", "Plan Assisto 1" , "America del Norte" , 650, "logos/Assisto_logo_.png");
const assisto2 = new Producto(6,"Assisto", "Plan Assisto 2" , "Oceania" , 550,"logos/Assisto_logo_.png");
const assisto3 = new Producto(7,"Assisto", "Plan Assisto 3" , "Africa" , 850,"logos/Assisto_logo_.png");
const assisto4 = new Producto(8,"Assisto", "Plan Assisto 4" , "America del Sur" , 350,"logos/Assisto_logo_.png");
const assisto5 = new Producto(9,"Assisto", "Plan Assisto 5" , "Caribe" , 450,"logos/Assisto_logo_.png");
const assisto6 = new Producto(10,"Assisto", "Plan Assisto 6" , "Asia" , 750,"logos/Assisto_logo_.png");
const assisto7 = new Producto(11,"Assisto", "Plan Assisto 7" , "Europa" , 250,"logos/Assisto_logo_.png");
const assisto8 = new Producto(12,"Assisto", "Plan Assisto 8" , "Turismo Interno" , 150,"logos/Assisto_logo_.png");
const assitcard1 = new Producto(8,"Assit Card", "Plan Assist Card 1" , "Europa" , 280,"logos/assist_travel_logo.webp");
const assitcard2 = new Producto(9,"Assit Card", "Plan Assist Card 2" , "Oceania" , 580, "logos/assist_travel_logo.webp");
const assitcard3 = new Producto(10,"Assit Card", "Plan Assist Card 3" , "America del Sur" , 380, "logos/assist_travel_logo.webp");
const assitcard4 = new Producto(11,"Assit Card", "Plan Assist Card 4" , "America del Norte" , 680, "logos/assist_travel_logo.webp");
const assitcard5 = new Producto(12,"Assit Card", "Plan Assist Card 5" , "Caribe" , 480, "logos/assist_travel_logo.webp");
const assitcard6 = new Producto(13,"Assit Card", "Plan Assist Card 6" , "Asia" , 780, "logos/assist_travel_logo.webp");
const assitcard7 = new Producto(14,"Assit Card", "Plan Assist Card 7" , "Africa" , 880, "logos/assist_travel_logo.webp");
const assitcard8 = new Producto(15,"Assit Card", "Plan Assist Card 8" , "Turismo Interno" , 180, "logos/assist_travel_logo.webp");
const productoArray = [tas1, tas2, tas3, tas4,tas5,tas6,tas7,tas8, 
                        assisto1, assisto2,assisto3, assisto4,assisto5,assisto6,assisto7,assisto8,
                        assitcard1, assitcard2, assitcard3, assitcard4, assitcard5, assitcard6, assitcard7, assitcard8];
let prodElegido = [];
const contProd = document.getElementById("contProd");
const mostrarProd = ()=> {
        arrayProductosPrecioFinal.forEach( (i) => {
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
                                        <button class="btn2">Ver Detalle</button>
                                    </div>
                                    </div>
                                    `;
            contProd.appendChild(card);           
            const boton = document.getElementById(`boton${i.id}`);
            boton.addEventListener("click", () => {
                agregarProdElejido(i.id);               
            });
            boton.addEventListener("click", () => {
                prodFinal();               
            }  
            )})}
const agregarProdElejido = (id) => {
        const producto = arrayProductosPrecioFinal.find(producto => producto.id === id);
        prodElegido.push(producto);      
}
const prodFiltrados = document.getElementById("prodFiltrados");
const prodFinal = ()=>{
    for(let i=0; i<prodElegido.length;i++){
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
                                <button class="btn1" id="boton${i.id}" >Pagar</button>
                                <button class="btn2">Ver Detalle</button>
                            </div>
                            </div>
                            `;
                            prodFiltrados.appendChild(card);

                            const boton = document.getElementById(`btnCotizador`);
                            boton.addEventListener("click", () => {
                                traerArrayJson();
                                volverMostrar();

                                
                            });
        })
    }}


const traerArrayJson = ()=>{
arrayProductosPrecioFinal.length = 0;
prodElegido.pop();
const arrayJson = sessionStorage.getItem("arrayProdJson");
const arrayParse = JSON.parse(arrayJson);
    arrayParse.forEach((i) => {
        arrayProductosPrecioFinal.push(i);
    })
}




const volverMostrar = ()=> {
        arrayProductosPrecioFinal.forEach( (i) => {
            prodFiltrados.innerHTML="";
            tarjCliente.innerHTML =`<div class="tarjCliente">
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
                                        <button class="btn2">Ver Detalle</button>
                                    </div>
                                    </div>
                                    `;
            contProd.appendChild(card);
        
            
            const boton = document.getElementById(`boton${i.id}`);
            boton.addEventListener("click", () => { 
                agregarProdElejido(i.id);
                
            });
            
        
            boton.addEventListener("click", () => {
                prodFinal();
                
            }  
            )})}