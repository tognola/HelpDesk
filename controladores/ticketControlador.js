var con = require('./bd');
var mail = require('./mailControlador');

module.exports = function(app){
  app.get('/ticket', (req, res) => {
    isLogged(req, res);
    var resultado;
    sql = "select ticket.id, ticket.titulo, ticket.inicio, ticket.fin, ticket.fecha_creacion, producto.nombre as producto, cliente.nombre as cliente \
      from ticket join cliente on ticket.cliente_id = cliente.id \
      join producto on ticket.producto_id = producto.id order by ticket.fecha_creacion desc";

      con.query(sql, (err,data) => {
      data.forEach((elem) => {
        elem.estado = elem.inicio === null ? "Pendiente" : elem.fin === null ? 'Abierto' : 'Resuelto';
        elem.fecha = new Date(elem.fecha_creacion);
      })

      res.render('ticket/lista', {data: data});
    })
  });

  app.get('/ticket/nuevo', (req, res) => {
    isLogged(req, res);
    res.render('ticket/nuevo')
  })

  app.get('/ticket/pendiente', (req,res) => {
    // isLogged(req, res);
    var sql = "select * from ticket join cliente on cliente_id = cliente.id where inicio is null"
    var options = {sql: sql, nestTables: true};
    con.query(options, (err,data) => {
      if(!err){
        res.send(data);
      }else{
        res.sendStatus(500)
      }
    })
  })


  app.get('/ticket/:id', (req, res)=>{
    isLogged(req, res);
    var sql = "select * from ticket t join (select id cliente_id, nombre as cliente from cliente) c on t.cliente_id = c.cliente_id join (select id _id, nombre as producto from producto) p on t.producto_id=p._id where t.id ="+req.params.id;
    console.log(sql)

    con.query(sql, (err, data)=>{
      if(!err){
        console.log(data[0])
        data[0].estado = data[0].inicio === null ? "Pendiente" : data[0].fin === null ? 'Abierto' : 'Resuelto';
        data[0].fecha = (new Date(data[0].fecha_creacion)).toLocaleString().split(",")[0];
        res.render('ticket/ticket', {data:data[0]})
      }

    })

  })


  app.post('/ticket/nuevo', (req, res) => {
    isLogged(req, res);

    var data = req.body;
    data.user_id = req.session.user_id;

    con.query('INSERT INTO ticket SET ?', data, (err, resultado) => {
      if(!err){
        res.redirect('../ticket');
        data.ticket_id = resultado.insertId;

        con.query('select nombre from cliente where id = ?', data.cliente_id, (err, resp)=>{
          data.cliente = resp[0].nombre;
          mail.notificarTicket(data)
        })
      }
      else{
        console.log(err); res.sendStatus(404)
      }
    });
  })

  var isLogged = function(req, res){
    if(req.session.user === undefined){
      res.redirect('/login')
      console.log(req.session.user)
    }
  }
}
