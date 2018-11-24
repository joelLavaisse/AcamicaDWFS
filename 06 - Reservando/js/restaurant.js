var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    var nuevosHorariosDisponibles = this.horarios.filter(horario => horario !== horarioReservado);
    this.horarios = nuevosHorariosDisponibles;
    return;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

var sumatoria = function(numeros) {
    var totalSumatoria = 0;
    numeros.forEach(numero => totalSumatoria += numero);
    return totalSumatoria;
}

var promedio = function(numeros) {
    var cantidadDeNumeros = numeros.length;
    var promedio = sumatoria(numeros)/cantidadDeNumeros;
    return Math.round(promedio * 10) / 10;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }

}
