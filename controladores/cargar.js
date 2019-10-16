var con = require('./bd');
var md5 = require('md5');
var moment = require('moment');
var Rmd5 = require('reverse-md5');
var rmd5 = Rmd5({
	lettersUpper: false,
	lettersLower: true,
	numbers: true,
	special: false,
	whitespace: true,
	maxLen: 12
});


var nuevoTicket = function(req, res){
  con.query('INSERT INTO ticket SET ?', req.body, (err, resultado) => {
  if(err) {console.log(err); res.sendStatus(404)}
  else{console.log(req.body);  res.sendStatus(200)}
  });
}

var nuevoViaje = function(req, res){
  var data = req.body;
  data.inicio = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  console.log(req.body);
  con.query('SELECT * from usuario where sesion = ?', [data.user_id], (err, resultado) => {
    console.log(resultado);
    data.user_id = resultado[0].id;
    con.query('INSERT INTO viaje SET ?', data, (err, resultado) => {
      if(err) {console.log(err); res.sendStatus(404)}
      else{console.log(req.body);  res.sendStatus(200)}
    });
  });

  con.query('update usuario set estado = ? where sesion = ?', [1, req.body.user_id])
}

var login = function(req, res){
  sql = "select * from usuario where user=?";
  data = [req.body.user]
  con.query(sql, data, (err, resultado)=>{
    if(!err){
      if(resultado.length !==0){
        if(resultado[0].pass == req.body.pass )
				req.session.user = resultado[0].user;
				req.session.user_id = resultado[0].id;
				req.session.estado = resultado[0].estado;
				req.session.permiso = resultado[0].permiso;
        res.sendStatus(400)
      }
    }else{
      console.log(sql,err)
    }
  });

}

module.exports = {
  nuevoTicket : nuevoTicket,
  nuevoViaje: nuevoViaje,
  login: login
}
