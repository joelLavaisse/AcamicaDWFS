/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },
  editarPregunta: function(indice, pregunta) {
    this.modelo.editarPregunta(indice, pregunta);
  },
  borrarPregunta: function(indice) {
    this.modelo.borrarPregunta(indice);
  },
  borrarTodo: function() {
    this.modelo.borrarTodo();
  },
  reiniciarVotacion: function() {
    this.modelo.reiniciarVotacion();
  },
  agregarVoto: function(respuestasSeleccionadas) {
    this.modelo.agregarVoto(respuestasSeleccionadas);
  }
};
