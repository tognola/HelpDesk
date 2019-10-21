var con = require('./bd');
var moment = require('moment');

module.exports = function(app){
  app.get('/viaje/crear', (req, res) => {
    isLogged(req, res);

    if(req.session.estado == 0){
      var sql = "select * from viaje order by inicio desc"
      con.query(sql, (err, resultado) => {
        if(!err){
          var data = {km_inicio: resultado[0].km_fin}
          res.render('viaje/crear', {data:data})
        }
      })

    }else if(req.session.estado == 1)
    {
      var sql = "select * from viaje where user_id = ? order by inicio desc;"
      con.query(sql, [req.session.user_id], (err, resultado)=>{
        if(!err){
          console.log(resultado[0])
          res.render('viaje/crear', {data: resultado[0]})
        }
      })
    }
    else if(req.session.estado == 2){
      console.log(req.session.estado)
      res.redirect('../tarea/crear')
    }
  })

  app.post('/viaje/nuevo', (req, res) => {
    isLogged(req, res);

    var data = req.body;
    data.inicio = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      data.user_id = req.session.user_id;
      console.log(req.body);

      data.ticket_id = data.ticket_id == "" ? null: data.ticket_id;
      data.km_fin = data.km_fin == "" ? null: data.km_fin;

      con.query('INSERT INTO viaje SET ?', data, (err, resultado) => {
        if(err) {console.log(err); res.sendStatus(404)}
        else{
          con.query('update usuario set estado = ? where id = ?', [1, req.session.user_id], (err) =>{
            if(!err){console.log(req.body); req.session.estado = 1;  res.redirect('crear')}
          })
        }
      });

 })

 app.post('/viaje/cerrar', (req, res) => {
   isLogged(req, res);

   console.log(req.body)
   var data = req.body;
   data.fin = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
   var viaje_id = data.viaje;
   delete data.viaje;
   console.log(req.body);
   con.query('update viaje SET fin=?, km_fin=?, comentario = ? where id = ?', [data.fin,data.km_fin,data.comentario, viaje_id], (err, resultado) => {
     con.query('update usuario set estado = ? where id = ?', [0, req.session.user_id], (err, resp)=>{
       if(!err) { console.log(resp); req.session.estado = 0; res.redirect('crear');}
       else res.sendStatus(502)
     })
   });

})

  var isLogged = function(req, res){
    if(req.session.user === undefined){
      res.redirect('/login')
      console.log(req.session.user)
    }
  }

}
