var con = require('./bd');

module.exports = function(app){
  app.get('/ticket', (req, res) => {
    var resultado;
    sql = "select ticket.id, ticket.titulo, ticket.inicio, ticket.fin, ticket.fecha_creacion, producto.nombre as producto, cliente.nombre as cliente \
      from ticket join cliente on ticket.cliente_id = cliente.id \
      join producto on ticket.producto_id = producto.id order by ticket.fecha_creacion desc";

      con.query(sql, (err,data) => {
      data.forEach((elem) => {
        elem.estado = elem.inicio === null ? "Pendiente" : elem.fin === null ? 'Abierto' : 'Cerrado';
        elem.fecha = (new Date(elem.fecha_creacion)).toLocaleString().split(",")[0];
      })

      res.render('lista-tickets', {data: data});
    })
  });

  app.get('/ticket/:id', (req, res)=>{
    var sql = "select * from ticket t join (select id, nombre as cliente from cliente) c on t.cliente_id = c.id join (select id, nombre as producto from producto) p on t.producto_id=p.id where t.id ="+req.params.id;
    console.log(sql)

    con.query(sql, (err, data)=>{
      console.log(data[0])
      data[0].estado = data[0].inicio === null ? "Pendiente" : data[0].fin === null ? 'Abierto' : 'Cerrado';
      data[0].fecha = (new Date(data[0].fecha_creacion)).toLocaleString().split(",")[0];
      res.render('ticket', {data:data[0]})
    })

  })
}
