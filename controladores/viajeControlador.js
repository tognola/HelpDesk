var con = require('./bd');
var moment = require('moment');

module.exports = function(app){
  app.get('/viaje/crear', (req, res) => {
          console.log(req.session.estado)
    if(req.session.estado == 0){
      res.render('viaje/crear')

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
  })

  app.post('/viaje/nuevo', (req, res) => {
    var data = req.body;
    data.inicio = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      data.user_id = req.session.user_id;
      console.log(req.body);

      data.ticket_id = data.ticket_id == "" ? null: data.ticket_id;

      con.query('INSERT INTO viaje SET ?', data, (err, resultado) => {
        if(err) {console.log(err); res.sendStatus(404)}
        else{;
          con.query('update usuario set estado = ? where id = ?', [1, req.session.user_id], (err) =>{
            if(!err){console.log(req.body); req.session.estado = 1;  res.redirect('crear')}
          })
        }
      });

 })

 app.post('/viaje/cerrar', (req, res) => {
   console.log(req.body)
   var data = req.body;
   data.fin = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
   console.log(req.body);
   con.query('update viaje set fin = ? where id = ?', [data.fin,data.viaje], (err, resultado) => {
     con.query('update usuario set estado = ? where id = ?', [0, req.session.user_id], (err)=>{
       if(!err) { req.session.estado = 0; res.redirect('crear');}
       else res.sendStatus(404)
     })
   });

})

}
