var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change',
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    cambiarColor(indicadorDeColor, colorActual);
  })
);

// Dibujo la paleta en pantalla
var paleta = document.getElementById('paleta');

function crearPaleta(){
  // Recorremos el array con los nombres de colores
  for(var i = 0; i < nombreColores.length; i++){
    // Se crea un elemento DIV, se aplica el color de fondo y se le asigna la clase 'color-paleta'
    var cuadroDeColor = document.createElement('DIV');
    cuadroDeColor.style.backgroundColor = nombreColores[i];
    cuadroDeColor.setAttribute('class', 'color-paleta');
    // Se asigna el event listener para la funcionalidad 'seleccionarColor'
    cuadroDeColor.addEventListener('click', seleccionarColor);
    // Se agrega el color a la paleta en pantalla
    paleta.appendChild(cuadroDeColor);
  }
};

// Dibujo la grilla en pantalla
var grilla = document.getElementById('grilla-pixeles');

function crearGrilla(){
  // Recorremos los 1750 elementos que componen la grilla y creamos un DIV por cada uno
  for(var i = 0; i < 1750; i++){
    var pixel = document.createElement('DIV');
    //Al hacer click pintamos el pixel y detectamos si se mantiene apretado el boton del mouse
    pixel.addEventListener('mousedown', pintarPixel);
    //Detectamos si se suelta el boton del mouse
    pixel.addEventListener('mouseup', soltarClick);
    //Al desplazarnos sobre los pixel detectamos si se debe pintar el trazo
    pixel.addEventListener('mouseover', pintarTrazo);
    grilla.appendChild(pixel);
  }
};

//Variable en la que guardamos el color seleccionado
var indicadorDeColor = document.getElementById('indicador-de-color');

//Funcion que nos permite saber que color seleccionamos
function seleccionarColor(e){
  var colorSeleccionado = e.target.style.backgroundColor;
  cambiarColor(indicadorDeColor, colorSeleccionado);
};

//Variable en la que guardamos el estado del mouse (si esta apretado o no)
var mouseApretado;

//Funcion que pinta el pixel con el color seleccionado y determina si se mantiene apretado el boton del mouse
function pintarPixel(e){
  var pixelPintado = e.target;
  var color = indicadorDeColor.style.backgroundColor;
  cambiarColor(pixelPintado, color);
  mouseApretado = true;
};

//Funcion que detecta si se ha soltado el boton del mouse
function soltarClick(){
  mouseApretado = false;
};

//Funcion que pinta un trazo si nos desplazamos y el boton del mouse se mantiene apretado
function pintarTrazo(e){
  if(mouseApretado){
    pintarPixel(e);
  }
};

//Funcion global que nos permite cambiar el color de fondo de un objeto
function cambiarColor(objeto, color){
  objeto.style.backgroundColor = color;
};

//Funcion que borra la grilla para empezar de cero
$('#borrar').click(function(){
  $('#grilla-pixeles DIV').animate({'backgroundColor': '#fff'}, 500);
});

//Funcion que apaga y enciende la grilla
$('#encender-grilla').click(function(){
  $('#grilla-pixeles DIV').toggleClass('grilla-off');
});

//Funcion que nos permite cargar el superheroe seleccionado en el menu inferior
$('.imgs li img').click(function(){
  var $idSuperheroe = $(this).attr('id');
  var $superheroe = window[$idSuperheroe];
  cargarSuperheroe($superheroe);
});

//Funcion que nos permite guardar el dibujo en un archivo .png
$('#guardar').click(function(){
  guardarPixelArt();
});

//Llamamos las funciones que nos dibujan la paleta y la grilla en pantalla
crearPaleta();
crearGrilla();
