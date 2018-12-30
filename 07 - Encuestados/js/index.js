var modelo = new Modelo();
var vistaAdmin = new VistaAdministrador(modelo, new Controlador(modelo), {
  'lista': $('#lista'),
  'botonEditarPregunta': $('#editarPregunta'),
  'botonBorrarPregunta': $('#borrarPregunta'),
  'borrarTodo': $('#borrarTodo'),
  'reiniciar': $('#reiniciarVotacion'),
  'pregunta': $('#pregunta'),
  'respuesta': $('#respuesta'),
  'formulario': $('localStorageForm'),
  'botonAgregarPregunta': $('#agregarPregunta'),
  'botonAgregarRespuesta': $('.botonAgregarRespuesta'),
  'muestraDeRespuestas': $('.panel-body')
});
vistaAdmin.inicializar();
var vistaUsuario = new VistaUsuario(modelo, new Controlador(modelo), {
  'listaPreguntas': $('#preguntas'),
  'botonAgregar': $('#agregarBoton'),
  'nombreUsuario' : $('#nombreUsuario'),
  'graficosDeTorta' : $('#graficosDeTorta'),
});
vistaUsuario.inicializar();