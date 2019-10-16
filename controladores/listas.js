var con = require('./bd');
var md5 = require('md5');

var listarUsuarios = function(req, res){
  listar("usuario", res)

}

var listarTareas = function(req, res){
  listar("tarea",res);

}

var listarTickets = function(req, res){
  var resultado;
  sql = "select ticket.id, ticket.titulo, ticket.inicio, ticket.fin, ticket.fecha_creacion, producto.nombre as producto, cliente.nombre as cliente \
    from ticket join cliente on ticket.cliente_id = cliente.id \
    join producto on ticket.producto_id = producto.id order by ticket.fecha_creacion desc";

    con.query(sql, (err,data) => {
    data.forEach((elem) => {
      elem.estado = elem.inicio === null ? "Pendiente" : elem.fin === null ? 'Abierto' : 'Cerrado';
      elem.fecha = (new Date(elem.fecha_creacion)).toLocaleString().split(",")[0];
    })
    res.send(data);
  })
}

var listarClientes = function(req, res){
  listar("cliente",res);

}

var listarProductos = function(req, res){
  if (req.params.cliente === null) listar("producto",res);
  else{
    var sql ="select p.id, p.nombre from cliente_producto c join producto p on c.producto_id = p.id where c.cliente_id = ?";
    con.query(sql, [req.params.cliente], (err, data)=>{
      res.send(data);
    })
  }
}

var listar = function(tabla, res){
  sql = "select * from "+tabla;
  con.query(sql, (err,data) => {
    res.send(data);
  })
}

module.exports = {
  listarUsuarios : listarUsuarios,
  listarTareas: listarTareas,
  listarTickets: listarTickets,
  listarClientes: listarClientes,
  listarProductos: listarProductos
}
