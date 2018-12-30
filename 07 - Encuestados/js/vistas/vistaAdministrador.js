/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;
  this.modelo.preguntas = JSON.parse(localStorage.getItem('preguntas'));

  // suscripción de observadores
  this.modelo.listaModificada.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $('<li/>').addClass('list-group-item').attr('id', pregunta.id).text(pregunta.textoPregunta);
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    this.modelo.preguntas = preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
    console.log(preguntas);
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        var respuesta = $(this).val();
        if(respuesta) {
          respuestas.push({'textoRespuesta': respuesta, 'cantidad': 0});
        }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonAgregarRespuesta.click(function() {
      var $template = $('#optionTemplate'),
      $clone = $template
      .clone()
      .removeClass('hide')
      .attr('id', "respuesta" + this.cantRespuestas)
      .insertBefore($template),
      $option = $clone.find('[name="option[]"]');

    // agregado de nuevo campo al formulario
    $('#localStorageForm').formValidation('addField', $option);
    });

    e.botonEditarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(id) {
        var preguntaAEditar = contexto.modelo.preguntas.find(pregunta => pregunta.id === id);
        var indice = contexto.modelo.preguntas.findIndex(pregunta => pregunta.id === id);
        var nuevaPregunta = prompt('Editar pregunta', preguntaAEditar.textoPregunta);
        contexto.controlador.editarPregunta(indice, nuevaPregunta);
      };
    });

    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      var indice = contexto.modelo.preguntas.findIndex(pregunta => pregunta.id === id);
      contexto.controlador.borrarPregunta(indice);
    });

    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodo();
    });

    e.reiniciar.click(function() {
      contexto.controlador.reiniciarVotacion();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
