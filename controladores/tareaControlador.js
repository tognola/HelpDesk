var con = require('./bd');
var moment = require('moment');

module.exports = function(app){

  app.get('/tarea/crear', (req, res) => {
    var data = {};
    data.ticket_id = req.query.ticket_id;
    console.log(req.query.ticket_id);


    if(req.session.estado == 0){
      res.render('tarea/nuevo', {data: data})

    }else if(req.session.estado == 2)
    {
      var sql = "select * from tarea where user_id = ? order by inicio desc;"
      con.query(sql, [req.session.user_id], (err, resultado)=>{
        if(!err){
          console.log(resultado[0])
          res.render('tarea/nuevo', {data: resultado[0]})
        }
      })
    }
    else if(req.session.estado == 1){
      res.redirect('../viaje/crear')
    }
  })

  app.get('/tarea/:id', (req, res)=>{
    var sql = "select * from tarea where ticket_id = "+req.params.id;
    con.query(sql, (err, data)=>{
      if(!err){
        //data[0].estado = data[0].inicio === null ? "Pendiente" : data[0].fin === null ? 'Abierto' : 'Cerrado';
        //data[0].fecha = (new Date(data[0].fecha_creacion)).toLocaleString().split(",")[0];
        res.send(data);
      }

    })

  })

  app.post('/tarea/nuevo', (req, res) => {
    var data = req.body;
    data.user_id = req.session.user_id;
    data.inicio = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    console.log(data);

    con.query('INSERT INTO tarea SET ?', data, (err, resultado) => {
    if(!err) {
      con.query('update ticket set inicio = ? where id = ? and inicio is NULL;', [data.inicio, data.ticket_id], (err)=>{
      if(!err) {
        con.query('update usuario set estado = ? where id = ?', [2, req.session.user_id], (err) =>{
          if(!err){console.log(req.body); req.session.estado = 2;  res.redirect('../ticket/'+data.ticket_id);}
        })
      }
      else res.sendStatus(404);
      })
    }
    else{console.log(err); res.sendStatus(500);}
    });
  })

  app.post('/tarea/cerrar', (req, res) => {
    var data = req.body;
    data.user_id = req.session.user_id;
    var tarea_id = data.tarea;
    delete data.tarea;
    data.fin = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    
    var resuelto = false;
    if(data.resuelto == 'on'){
      resuelto = true;
      delete data.resuelto;
    }

    console.log(data);
    con.query('update tarea SET ? where id = ?', [data, tarea_id], (err, resultado) => {
    if(!err) {
        con.query('update usuario set estado = ? where id = ?', [0, req.session.user_id], (err) =>{
          if(!err){
            console.log(req.body); req.session.estado = 0;  res.redirect('../ticket/'+data.ticket_id);
            if(resuelto)
            con.query('update ticket set fin = ? where id = ? and fin is NULL;', [data.fin, data.ticket_id], (err)=>{
              if(!err) {} else res.sendStatus(404);})
          }
        })

    }
    else{console.log(err); res.sendStatus(500);}
    });
  })
}
