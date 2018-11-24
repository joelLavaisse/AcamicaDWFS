var Reserva = function(horario, cantidadDePersonas, precioPorPersona, codigoDeDescuento) {
    this.horario = horario,
    this.cantidadDePersonas = cantidadDePersonas,
    this.precioPorPersona = precioPorPersona,
    this.codigoDeDescuento = codigoDeDescuento
}

Reserva.prototype.precioBase = function() {
    return this.cantidadDePersonas * this.precioPorPersona;
}

Reserva.prototype.descuentoPorGruposGrandes = function() {
    if(this.cantidadDePersonas >= 4 && this.cantidadDePersonas < 6) {
        return this.precioBase() * 0.05;
    } else if(this.cantidadDePersonas >= 6 && this.cantidadDePersonas < 8) {
        return this.precioBase() * 0.1;
    } else if(this.cantidadDePersonas >= 8) {
        return this.precioBase() * 0.15;
    } else {
        return 0;
    };
}

Reserva.prototype.descuentoPorCupon = function() {
    if(this.codigoDeDescuento === 'DES15') {
        return this.precioBase() * 0.15;
    } else if(this.codigoDeDescuento === 'DES200') {
        return 200;
    } else if(this.codigoDeDescuento === 'DES1') {
        return this.precioPorPersona;
    } else {
        return 0;
    };
}

Reserva.prototype.adicionalPorHorario = function() {
    var horaDeReserva = this.horario.getHours();
    if((horaDeReserva >= 13 && horaDeReserva < 14) || (horaDeReserva >= 20 && horaDeReserva < 21)) {
        return this.precioBase() * 0.05;
    } else {
        return 0;
    };
}

Reserva.prototype.adicionalPorDia = function() {
    var diaDeReserva = this.horario.getDay();
    if(diaDeReserva >= 5 && diaDeReserva <= 7) {
        return this.precioBase() * 0.1;
    } else {
        return 0;
    };
}

Reserva.prototype.precioFinal = function() {
    return this.precioBase() - this.descuentoPorGruposGrandes() - this.descuentoPorCupon() + this.adicionalPorDia() + this.adicionalPorHorario();
}