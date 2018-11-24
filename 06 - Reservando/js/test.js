var restauranteTest = new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]);
var reservaTest = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, 'DES1');
var expect = chai.expect;

describe('Testeamos la reserva de horarios.', function(){
    beforeEach(function(){
        // Reiniciamos los horarios disponibles
        restauranteTest.horarios = ["12:00", "13:00", "14:30"];
    })

    it('Se reserva el horario correcto.', function(){
        restauranteTest.reservarHorario('13:00');
        var cantidadDeHorariosDisponibles = restauranteTest.horarios.length;
        expect(cantidadDeHorariosDisponibles).to.equal(2);
    })
    it('No se puede reservar un horario que no existe.', function(){
        restauranteTest.reservarHorario('11:00');
        var cantidadDeHorariosDisponibles = restauranteTest.horarios.length;
        expect(cantidadDeHorariosDisponibles).to.equal(3);
    })
    it('Si no se pasa el horario a reservar, no se realiza reserva.', function(){
        restauranteTest.reservarHorario();
        var cantidadDeHorariosDisponibles = restauranteTest.horarios.length;
        expect(cantidadDeHorariosDisponibles).to.equal(3);
    })
    it('Si se pasa un string vacío, no se realiza reserva.', function(){
        restauranteTest.reservarHorario("");
        var cantidadDeHorariosDisponibles = restauranteTest.horarios.length;
        expect(cantidadDeHorariosDisponibles).to.equal(3);
    })
});

describe('Testeamos el cálculo de puntuación.', function(){
    it('Se calcula correctamente el promedio.', function(){
        var promedio = restauranteTest.obtenerPuntuacion();
        expect(promedio).to.equal(6);
    })
    it('Si no tiene calificaciones, la puntuación es cero.', function(){
        restauranteTest.calificaciones = [];
        var promedio = restauranteTest.obtenerPuntuacion();
        expect(promedio).to.equal(0);
    })
})

describe('Testeamos que al realizar una calificación, se ingrese un valor correcto.', function(){
    beforeEach(function(){
        // Reiniciamos las calificaciones originales
        restauranteTest.calificaciones = [6, 5, 9, 10, 5];
    })
    it('Se admiten valores enteros entre 0 y 9.', function(){
        restauranteTest.calificar(6);
        var cantidadDeCalificaciones = restauranteTest.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(6);
    })
    it('No se admiten valores enteros negativos.', function(){
        restauranteTest.calificar(-2);
        var cantidadDeCalificaciones = restauranteTest.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(5);
    })
    it('No se admiten valores enteros mayores a 9.', function(){
        restauranteTest.calificar(10);
        var cantidadDeCalificaciones = restauranteTest.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(5);
    })
    it('No se admiten valores decimales por más que se encuentren entre 0 y 9. Solo se admiten enteros.', function(){
        restauranteTest.calificar(4.2);
        var cantidadDeCalificaciones = restauranteTest.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(5);
    })
    it('No se admiten palabras. Solo se admiten enteros.', function(){
        restauranteTest.calificar('Bueno');
        var cantidadDeCalificaciones = restauranteTest.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(5);
    })
    it('No se admiten palabras. Solo se admiten enteros.', function(){
        restauranteTest.calificar('Bueno');
        var cantidadDeCalificaciones = restauranteTest.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(5);
    })
    it('No se pueden pasar calificaciones vacías.', function(){
        restauranteTest.calificar();
        var cantidadDeCalificaciones = restauranteTest.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(5);
    })
})

describe('Testeamos que la busqueda se realice con los parámetros adecuados.', function(){
    // Tomando un listado de 24 elementos, el id puede ir desde 1 hasta 24
    it('Buscamos un id entero entre 1 y 24.', function(){
        var resultado = listado.buscarRestaurante(10);
        expect(resultado).to.eql(listadoDeRestaurantes[9]);
    })
    it('Buscamos un restaurant con id 0 y devuelve que no se ha encontrado ningún restaurant.', function(){
        var resultado = listado.buscarRestaurante(0);
        expect(resultado).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Buscamos un restaurant con id mayor a 24 y devuelve que no se ha encontrado ningún restaurant.', function(){
        var resultado = listado.buscarRestaurante(30);
        expect(resultado).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Buscamos un restaurant con id decimal entre 1 y 24 y devuelve que no se ha encontrado ningún restaurant.', function(){
        var resultado = listado.buscarRestaurante(8.6);
        expect(resultado).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Buscamos un restaurant con id negativo y devuelve que no se ha encontrado ningún restaurant.', function(){
        var resultado = listado.buscarRestaurante(-2);
        expect(resultado).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Buscamos un restaurant con id vacío y devuelve que no se ha encontrado ningún restaurant.', function(){
        var resultado = listado.buscarRestaurante();
        expect(resultado).to.equal('No se ha encontrado ningún restaurant');
    })
    it('Buscamos un restaurant con string vacío y devuelve que no se ha encontrado ningún restaurant.', function(){
        var resultado = listado.buscarRestaurante("");
        expect(resultado).to.equal('No se ha encontrado ningún restaurant');
    })
})

describe('Testeamos que los filtros de busqueda funcionen correctamente.', function(){
    it('Dejamos todos los filtros vacíos (null) y nos devuelve el listado completo de restaurantes.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, null);
        expect(resultado.length).to.equal(24);
    })
})

describe('Testeamos que el filtro de categoría funcione correctamente.', function(){
    it('Buscamos restaurantes con una categoría válida (Pizza) y devuelve un resultado válido (4 restaurantes).', function(){
        var resultado = listado.obtenerRestaurantes('Pizza', null, null);
        expect(resultado.length).to.equal(4);
    })
    it('Buscamos restaurantes con una categoría inválida (Asado) y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes('Asado', null, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un string vacío ("") como categoría y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes('', null, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un número entero (1234) como categoría y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(1234, null, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un float (5.2) como categoría y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(5.2, null, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un NaN como categoría y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(NaN, null, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un booleano (true) como categoría y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(true, null, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un undefined como categoría y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(undefined, null, null);
        expect(resultado.length).to.equal(0);
    })
})

describe('Testeamos que el filtro de ciudad funcione correctamente.', function(){
    it('Buscamos restaurantes con una ciudad válida (Roma) y se encuentran 2 opciones.', function(){
        var resultado = listado.obtenerRestaurantes(null, 'Roma', null);
        expect(resultado.length).to.equal(2);
    })
    it('Buscamos restaurantes con una ciudad inválida (Córdoba) y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, 'Córdoba', null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un string vacío ("") como ciudad y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, '', null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un número entero (1234) como ciudad y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, 1234, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un float (5.2) como ciudad y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, 5.2, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un NaN como ciudad y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, NaN, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un booleano (true) como ciudad y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, true, null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un undefined como ciudad y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, undefined, null);
        expect(resultado.length).to.equal(0);
    })
})

describe('Testeamos que el filtro de horario funcione correctamente.', function(){
    it('Buscamos restaurantes con un horario válido (13:00) y se encuentran 3 opciones.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, '13:00');
        expect(resultado.length).to.equal(3);
    })
    it('Buscamos restaurantes con un horario inválido (10:00) y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, '10:00', null);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un string vacío ("") como horario y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, '');
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un número entero (1234) como horario y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, 1234);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un float (5.2) como horario y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, 5.2);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un NaN como horario y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, NaN);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un booleano (true) como horario y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, true);
        expect(resultado.length).to.equal(0);
    })
    it('Buscamos restaurantes con un undefined como horario y no devuelve ningún restaurant.', function(){
        var resultado = listado.obtenerRestaurantes(null, null, undefined);
        expect(resultado.length).to.equal(0);
    })
})

describe('Testeamos que las reservas se creen con datos válidos.', function(){
    it('Verificamos que en el horario se ingrese un objeto Date.', function(){
        expect(reservaTest.horario.constructor).to.equal(Date);
    })
    it('Verificamos que en la cantidad de personas se ingrese un numero entero.', function(){
        var esEntero = Number.isInteger(reservaTest.cantidadDePersonas);
        expect(esEntero).to.equal(true);
    })
    it('Verificamos que en el precio por persona se ingrese un numero entero.', function(){
        var esEntero = Number.isInteger(reservaTest.precioPorPersona);
        expect(esEntero).to.equal(true);
    })
    it('Verificamos que en el código de descuento se ingrese un string.', function(){
        expect(typeof(reservaTest.codigoDeDescuento)).to.equal('string');
    })
})

describe('Testeamos que los precios de la reserva se calculen correctamente.', function(){
    it('Se calcula correctamente el precio base de la reserva.', function(){
        var precioBase = reservaTest.precioBase();
        expect(precioBase).to.equal(2800);
    })
    it('Se calcula correctamente el descuento por grupos grandes.', function(){
        var descuentoPorGruposGrandes = reservaTest.descuentoPorGruposGrandes();
        expect(descuentoPorGruposGrandes).to.equal(420);
    })
    it('Se calcula correctamente el descuento por cupon.', function(){
        var descuentoPorCupon = reservaTest.descuentoPorCupon();
        expect(descuentoPorCupon).to.equal(350);
    })
    it('Se calcula correctamente el adicional por horario.', function(){
        var adicionalPorHorario = reservaTest.adicionalPorHorario();
        expect(adicionalPorHorario).to.equal(0);
    })
    it('Se calcula correctamente el adicional por dia.', function(){
        var adicionalPorDia = reservaTest.adicionalPorDia();
        expect(adicionalPorDia).to.equal(280);
    })
    it('Se calcula correctamente el precio final de la reserva.', function(){
        var precioFinal = reservaTest.precioFinal();
        expect(precioFinal).to.equal(2310);
    })
})
