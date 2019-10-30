var con = require('./bd');
var md5 = require('md5');
var moment = require('moment');

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

var logout = function(req, res){
	req.session.user = undefined;
	req.session.estado = undefined;
	req.session.user_id = undefined;
	res.redirect('login')
}

module.exports = {
  login: login,
	logout: logout
}
