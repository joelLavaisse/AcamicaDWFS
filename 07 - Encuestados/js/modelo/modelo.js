/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.listaModificada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if(this.preguntas.length === 0) {
      return 0;
    } else {
      var ultimaPregunta = this.preguntas[this.preguntas.length - 1];
      return ultimaPregunta.id;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
  },

  //Se borra una pregunta dado su indice en el array de preguntas
  borrarPregunta: function(indice) {
    this.preguntas.splice(indice, 1);
    this.guardar();
  },
  
  agregarVoto: function(respuestasSeleccionadas) {
    var contexto = this;
    respuestasSeleccionadas.map(function(respuestaSeleccionada) {
      var preguntaVotada = contexto.preguntas.find(function(pregunta) {
        return pregunta.textoPregunta === respuestaSeleccionada.nombre;
      });
      var respuestaVotada = preguntaVotada.cantidadPorRespuesta.find(function(respuesta) {
        return respuesta.textoRespuesta === respuestaSeleccionada.respuesta;
      });
      if(respuestaVotada) {
        respuestaVotada.cantidad++;
        console.log(respuestaVotada.cantidad);
      };
    })
    this.guardar();
  },

  editarPregunta: function(indice, nuevaPregunta) {
    this.preguntas[indice].textoPregunta = nuevaPregunta;
    this.guardar();
  },
  
  borrarTodo: function() {
    this.preguntas = [];
    this.guardar();
  },

  reiniciarVotacion: function() {
    for(var i = 0; i < this.preguntas.length; i++) {
      for(var j = 0; j < this.preguntas[i].cantidadPorRespuesta.length; j++) {
        this.preguntas[i].cantidadPorRespuesta[j].cantidad = 0;
        };
    };
    this.guardar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
    this.listaModificada.notificar();
  },
};
