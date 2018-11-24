//Declaración de variables

var nombreUsuario = "Juan Perez";
var codigoDeSeguridad = 1234;

var saldoCuenta = 10000;
var limiteExtraccion = 2000;

var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;

var cotizacionDolar = 24.92;
var limiteCompraDolares = 200;
var cantidadDolaresComprados = 0;

var cuentaAmiga1 = 123456789;
var cuentaAmiga2 = 987654321;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.

window.onload = function() {
  iniciarSesion();
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  limiteAnterior = limiteExtraccion;
  limiteExtraccion = prompt("Ingrese el nuevo limite de extraccion");
  if(esNumero(limiteExtraccion)) {
    limiteExtraccion = parseInt(limiteExtraccion);
    actualizarLimiteEnPantalla();
    alert("Su nuevo limite de extraccion es de $" + limiteExtraccion);
  } else {
    limiteExtraccion = limiteAnterior;
  }
}

function extraerDinero() {
  var extraccion = prompt("Ingrese la cantidad a extraer");
  if(esNumero(extraccion)) {
    extraccion = parseInt(extraccion);
    if(esMayorA(extraccion, saldoCuenta)) {
      alert("Saldo insuficiente.\nPor favor ingrese un monto menor.");
      extraerDinero(extraccion);
    } else if (esMayorA(extraccion, limiteExtraccion)) {
      alert("El monto supera el límite de extracción.\nPor favor ingrese un monto menor.");
      extraerDinero();
    } else if (!esMultiploDe100(extraccion)) {
      alert("El monto debe ser múltiplo de $100.\nPor favor ingrese otro monto.");
      extraerDinero();
    } else {
      var saldoAnterior = saldoCuenta;
      saldoCuenta -= extraccion;
      actualizarSaldoEnPantalla();
      alert("Saldo Anterior: $" + saldoAnterior + "\nCantidad extraida: $" + extraccion + "\nNuevo Saldo: $" + saldoCuenta);
    }
  }
}

function depositarDinero() {
  var deposito = prompt("Ingrese la cantidad a depositar");
  if(esNumero(deposito)) {
    deposito = parseInt(deposito);
    var saldoAnterior = saldoCuenta;
    saldoCuenta += deposito;
    actualizarSaldoEnPantalla();
    alert("Saldo Anterior: $" + saldoAnterior + "\nSuma depositada: $" + deposito + "\nNuevo Saldo: $" + saldoCuenta);
  }
}

function pagarServicio() {
  saldoAnterior = saldoCuenta;
  var servicio = prompt("Ingrese el número correspondiente al servicio que desee pagar\n1 - Agua\n2 - Luz\n3 - Internet\n4 - Telefono");
  var nombreServicio;
  var montoServicio;
  if(esNumero(servicio)) {
    servicio = parseInt(servicio);
    switch (servicio) {
      case 1:
        nombreServicio = "Agua";
        montoServicio = agua;
        break;
      case 2:
        nombreServicio = "Luz";
        montoServicio = luz;
        break;
      case 3:
        nombreServicio = "Internet";
        montoServicio = internet;
        break;
      case 4:
        nombreServicio = "Telefono";
        montoServicio = telefono;
        break;
      default:
        alert("El servicio seleccionado no existe.\nPor favor ingrese otro número");
        pagarServicio();
    }
    if(esNumero(montoServicio)) {
      if(esMayorA(montoServicio, saldoCuenta)) {
        alert("Saldo insuficiente.\nPor favor seleccione otro servicio.");
        pagarServicio();
      } else {
        saldoCuenta -= montoServicio;
        alert("Servicio pagado: " + nombreServicio + "\nMonto: $" + montoServicio + "\nNuevo Saldo: $" + saldoCuenta);
      }
    }
    actualizarSaldoEnPantalla();
  }
}

function comprarDolares() {
  var cantidadAComprarEnDolares = prompt("Cotización del dólar: $" + cotizacionDolar + "\n\nLímite de compra diario: US$" + limiteCompraDolares + "\n\nDisponible para comprar: US$" + (limiteCompraDolares - cantidadDolaresComprados) + "\n\nIngrese la cantidad de dolares que desea comprar");
  if(esNumero(cantidadAComprarEnDolares)) {
    cantidadAComprarEnDolares = parseInt(cantidadAComprarEnDolares);
    cantidadDolaresComprados += cantidadAComprarEnDolares;
    var cantidadAComprarEnPesos = cantidadAComprarEnDolares * cotizacionDolar;
    if(esMayorA(cantidadAComprarEnPesos, saldoCuenta)) {
      alert("Saldo insuficiente.\nPor favor ingrese un monto menor.");
      cantidadDolaresComprados -= cantidadAComprarEnDolares;
      comprarDolares();
    } else if (esMayorA(cantidadDolaresComprados, limiteCompraDolares)) {
      alert("El monto supera el límite de compra diario.\nPor favor ingrese un monto menor.");
      cantidadDolaresComprados -= cantidadAComprarEnDolares;
      comprarDolares();
    } else {
      var saldoAnterior = saldoCuenta;
      saldoCuenta -= cantidadAComprarEnPesos;
      actualizarSaldoEnPantalla();
      alert("Se han comprado US$" + cantidadAComprarEnDolares + " por un monto de $" + cantidadAComprarEnPesos + "\nEl saldo de su cuenta es de $" + saldoCuenta);
    }
  }
}

function transferirDinero() {
  var montoATransferir = prompt("Ingrese el monto a transferir.");
  if(esNumero(montoATransferir)) {
    montoATransferir = parseInt(montoATransferir);
    if(esMayorA(montoATransferir, saldoCuenta)) {
      alert("Saldo insuficiente.\nPor favor ingrese un monto menor.");
      transferirDinero();
    } else {
      var cuentaDestino = prompt("Ingrese la cuenta destino.");
      if(esNumero(cuentaDestino)) {
        cuentaDestino = parseInt(cuentaDestino);
        switch (cuentaDestino) {
          case cuentaAmiga1:
            transferenciaOk(cuentaAmiga1, montoATransferir);
            break;
          case cuentaAmiga2:
            transferenciaOk(cuentaAmiga2, montoATransferir);
            break;
          default:
            alert("Solo pueden realizarse transferencias a cuentas amigas.\nTransferencia cancelada.")
        }
      }
    }
  }
}

function transferenciaOk(cuenta, monto) {
  saldoCuenta -= monto;
  actualizarSaldoEnPantalla();
  alert("Se han transferido: $" + monto + "\nCuenta destino: " + cuenta);
}

function iniciarSesion() {
  var codigoIngresado = parseInt(prompt("Ingrese su código de seguridad para inciar sesión."));
  if(codigoIngresado === codigoDeSeguridad) {
    alert("Bienvenido/a " + nombreUsuario + ".\nYa puedes comenzar a realizar operaciones.")
  } else {
    alert("Código incorrecto.\nTu dinero ha sido retenido por cuestiones de seguridad.")
    saldoCuenta = 0;
  }
}

function esMayorA(monto, limite) {
  return monto > limite;
}

function esMultiploDe100(monto) {
  return monto % 100 == 0;
}

function esNumero(monto) {
  if(monto == null || monto == "") {
    return false;
  } else {
    monto = parseInt(monto);
    if(isNaN(monto)) {
      alert("Solo se admiten valores numéricos.\nOperación cancelada.");
      return false;
    } else {
      return true;
    }
  }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
