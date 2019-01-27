var conexion = require('../lib/conexionbd');

// Listamos los rubros por los cuales se pueden crear competencias
// Listamos los generos
function listarGeneros(req, res) {
  var sql = 'SELECT * FROM genero';
  
  conexion.query(sql, function(error, resultado, campos) {
    if(error) {
      console.log('Hubo un error en la consulta', error.message);
      return res.status(500).send('Hubo un error en la consulta');
    };
    res.status(200).send(JSON.stringify(resultado));
  })
};

// Listamos los directores
function listarDirectores(req, res) {
  var sql = 'SELECT * FROM director';
  
  conexion.query(sql, function(error, resultado, campos) {
    if(error) {
      console.log('Hubo un error en la consulta', error.message);
      return res.status(500).send('Hubo un error en la consulta');
    };
    res.status(200).send(JSON.stringify(resultado));
  })
};

// Listamos los actores y actrices
function listarActores(req, res) {
  var sql = 'SELECT * FROM actor';
  
  conexion.query(sql, function(error, resultado, campos) {
    if(error) {
      console.log('Hubo un error en la consulta', error.message);
      return res.status(500).send('Hubo un error en la consulta');
    };
    res.status(200).send(JSON.stringify(resultado));
  })
};

// Creamos una funcion universal que nos permite buscar peliculas
// de acuerdo a los parametros enviados
function sqlBuscarPeliculas(genero, director, actor) {
  var sqlJoin = function() {
    var sql = '';
    if(director > 0) {
      sql += ` JOIN director_pelicula ON pelicula.id = director_pelicula.pelicula_id
               JOIN director ON director_pelicula.director_id = director.id`
    }
    if(actor > 0) {
      sql += ` JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id
               JOIN actor ON actor_pelicula.actor_id = actor.id`
    }
    return sql;
  }

  var sqlFiltros = function() {
    var sql = '';
    if((genero + director + actor) > 0) {
      sql += ' WHERE ';
    }
    if(genero > 0) {
      sql += 'genero_id = ' + genero;
    }
    if(genero > 0 && (director > 0 || actor > 0)) {
      sql += ' AND ';
    }
    if(director > 0) {
      sql += 'director.id = ' + director;
    }
    if(director > 0 && actor > 0) {
      sql += ' AND ';
    }
    if(actor > 0) {
      sql += 'actor.id = ' + actor;
    }
    return sql;
  }

  var sql = 'SELECT pelicula.* FROM pelicula' + sqlJoin() + sqlFiltros() + ' ORDER BY RAND() LIMIT 2';

  return sql;
}

// Obtenemos las opciones de la competencia seleccionada
function obtenerOpciones(req, res) {
  var respuesta = {};
  var id = req.params.id;
  var sql = 'SELECT * FROM competencia WHERE competencia.id = ' + id;
  conexion.query(sql, function(error, resultado, campos) {
    if(error) {
      console.log('Hubo un error en la consulta', error.message);
      return res.status(500).send('Hubo un error en la consulta');
    }
    if(resultado.length <= 0) {
      console.log('La competencia no existe');
      return res.status(404).send('La competencia no existe');
    }

    // Creamos el objeto respuesta
    respuesta = {
      competencia: resultado[0].nombre,
      genero_id: resultado[0].genero_id,
      director_id: resultado[0].director_id,
      actor_id: resultado[0].actor_id,
    }

    // Creamos la query usando la funcion universal sqlBuscarPeliculas
    var sql = sqlBuscarPeliculas(respuesta.genero_id, respuesta.director_id, respuesta.actor_id);
    conexion.query(sql, function(error, resultado, campos) {
      if(error) {
        console.log('Hubo un error en la consulta', error.message);
        return res.status(500).send('Hubo un error en la consulta');
      };
      respuesta.peliculas = resultado;
      res.send(JSON.stringify(respuesta));
      console.log(sql);
      console.log(respuesta);
    })
  })  
};

// Registramos los votos
function votar(req, res) {
  var idCompetencia = req.params.id;
  var idPelicula = req.body.idPelicula;
  console.log(req.body);
  var sql = 'INSERT INTO voto (id_competencia, id_pelicula) VALUES (' + idCompetencia + ', ' + idPelicula + ')';
  conexion.query(sql, function(error, resultado, campos) {
    if(error) {
      console.log('Hubo un error al registrar el voto.', error.message);
      return res.status(500).send('Hubo un error al registrar el voto.');
    };
    if(!idCompetencia) {
      console.log('La competencia no existe o no se encuentra en el servidor.');
      return res.status(500).send('La competencia no existe o no se encuentra en el servidor.');
    };
    if(!idPelicula) {
      console.log('La pelicula no existe o no se encuentra en el servidor.');
      return res.status(500).send('La pelicula no existe o no se encuentra en el servidor.');
    };
    console.log(resultado.affectedRows + ' voto agregado!');
    console.log('Competencia: '+idCompetencia+', Pelicula: '+idPelicula);
    return res.status(200).send('Voto registrado!');
  })
};

// Obtenemos los resultados de la competencia seleccionada
function obtenerResultados(req, res) {
  var id = req.params.id;
  var sql = `SELECT competencia.nombre, 
                    pelicula.id, 
                    pelicula.titulo, 
                    pelicula.poster, 
                    count(voto.id_pelicula) as votos
               FROM competencia
               JOIN voto ON voto.id_competencia = competencia.id 
               JOIN pelicula ON voto.id_pelicula = pelicula.id
              WHERE competencia.id = ` + id + `
           GROUP BY pelicula.id
           ORDER BY votos DESC
              LIMIT 0,3;`

  conexion.query(sql, function(error, resultado, campos) {
    if(error) {
      console.log('Hubo un error en la consulta', error.message);
      return res.status(500).send('Hubo un error en la consulta');
    };
    // Si la competencia no ha recibido votos devolvemos el mensaje correspondiente
    if(!resultado || resultado.length == 0) {
      console.log('Esta competencia todavia no ha recibido votos.');
      return res.status(422).send('Esta competencia todavia no ha recibido votos');
    } else {
      var respuesta = {
        competencia: resultado[0].nombre,
        resultados: resultado,
      }
      console.log(respuesta);
      res.status(200).send(JSON.stringify(respuesta));
    }
  })
};

// Obtenemos la competencia pasada por parametro
function obtenerCompetencia(req, res) {
  var id = req.params.id;
  var sql = 'SELECT * FROM competencia WHERE id = ?';
  
  conexion.query(sql, [id], function(error, resultado, campos) {
    if(error) {
      console.log('Hubo un error en la consulta', error.message);
      return res.status(500).send('Hubo un error en la consulta');
    };
    if(!id) {
      console.log('La competencia no existe.');
      return res.status(404).send('La competencia no existe.');
    };
    console.log(resultado[0])
    res.send(JSON.stringify(resultado[0]));
  })
};

// Listamos las competencias creadas
function listarCompetencias(req, res) {
  var sql = 'SELECT * FROM competencia';
  
  conexion.query(sql, function(error, resultado, campos) {
    if(error) {
      console.log('No se encuentra ninguna competencia en el servidor.', error.message);
      return res.status(500).send('No se encuentra ninguna competencia en el servidor.');
    };
    res.send(JSON.stringify(resultado));
  })
};

// Creamos la competencia con los parametros seleccionados
function crearCompetencia(req, res) {
  var nombre = req.body.nombre === '' ? null : req.body.nombre;
  var genero_id = req.body.genero;
  var director_id = req.body.director;
  var actor_id = req.body.actor;

  // Buscamos si existe una competencia con el mismo nombre
  var sqlBusqueda = 'SELECT * FROM competencia WHERE nombre = ?'
  conexion.query(sqlBusqueda, [nombre], function(error, resultado, campos) {
    if(resultado && resultado.length !== 0) {
      console.log('La competencia ya existe');
      return res.status(422).send('La competencia ya existe');
    } else {
      // Verificamos que la cantidad de peliculas que coinciden con los parametros seleccionados
      // sea suficiente para crear la competencia
      var sqlsqlBuscarPeliculas = sqlBuscarPeliculas(genero_id, director_id, actor_id);
      conexion.query(sqlsqlBuscarPeliculas, [nombre], function(error, resultado, campos) {
        if(resultado && resultado.length < 2) {
          console.log('La cantidad de resultados obtenidos no es suficiente para crear una competencia');
          return res.status(422).send('La cantidad de resultados obtenidos no es suficiente para crear una competencia');
        } else {
          var sql = 'INSERT INTO competencia (nombre, genero_id, director_id, actor_id) VALUES (?, ?, ?, ?)';
          conexion.query(sql, [nombre, genero_id, director_id, actor_id], function(error, resultado, campos) {
            if(error) {
              console.log('El campo NOMBRE no puede estar en blanco', error.message);
              return res.status(422).send('El campo NOMBRE no puede estar en blanco');
            }
            console.log(resultado.affectedRows + ' competencia agregada!');
            return res.status(200).send('La competencia se ha creado con exito!');
          })
        };
      })  
    }
  })
};

// Editamos el nombre de la competencia seleccionada
function editarCompetencia(req, res) {
  var idCompetencia = req.params.id;
  var nuevoNombre = req.body.nombre === '' ? null : req.body.nombre;
  var sql = 'UPDATE competencia SET nombre = ? WHERE id = ?';
  conexion.query(sql, [nuevoNombre, idCompetencia], function(error, resultado, campos) {
    if(error) {
      console.log('El campo NOMBRE no puede estar en blanco', error.message);
      return res.status(422).send('El campo NOMBRE no puede estar en blanco');
    }
    if(!idCompetencia) {
      console.log('La competencia no existe');
      return res.status(404).send('La competencia no existe');
    }
    console.log('Se actualizó el nombre de la competencia Nº ' + idCompetencia + ' por ' + nuevoNombre);
    res.status(200).send('Se actualizó el nombre de la competencia por ' + nuevoNombre);
  })
};

// Eliminamos los votos de la competencia seleccionada
function eliminarVotos(req, res) {
  var idCompetencia = req.params.id;
  var sql = 'DELETE FROM voto WHERE id_competencia = ?';
  conexion.query(sql, [idCompetencia], function(error, resultado, campos) {
    if(error) {
      console.log('No se encuentra la competencia. No se borraron votos.', error.message);
      return res.status(500).send('No se encuentra la competencia. No se borraron votos.');
    };
    console.log(resultado.affectedRows + ' votos eliminados!');
    return res.status(200).send(resultado.affectedRows + ' votos eliminados!');
  })
};

// Eliminamos la competencia seleccionada
function eliminarCompetencia(req, res) {
  var idCompetencia = req.params.id;
  var sql = 'DELETE FROM competencia WHERE id = ?';
  conexion.query(sql, [idCompetencia], function(error, resultado, campos) {
    if(error) {
      console.log('No se encuentra la competencia. Nada para eliminar.', error.message);
      return res.status(404).send('No se encuentra la competencia. Nada para eliminar.');
    };
    eliminarVotos(req, res);
    console.log('Se eliminó ' + resultado.affectedRows + ' competencia con id ' + idCompetencia);
  })
};

module.exports = {
  listarCompetencias: listarCompetencias,
  obtenerCompetencia: obtenerCompetencia,
  listarGeneros: listarGeneros,
  listarDirectores: listarDirectores,
  listarActores: listarActores,
  obtenerOpciones: obtenerOpciones,
  obtenerResultados: obtenerResultados,
  votar: votar,
  crearCompetencia: crearCompetencia,
  eliminarVotos: eliminarVotos,
  eliminarCompetencia: eliminarCompetencia,
  editarCompetencia: editarCompetencia,
}