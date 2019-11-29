var express = require('express');
var cors = require('cors');
var con = require('./controladores/bd');
var session = require('express-session')
var api = require('./controladores/listas')
var cargar = require('./controladores/cargar')
var ticket = require('./controladores/ticketControlador')
var viaje = require('./controladores/viajeControlador')
var tarea = require('./controladores/tareaControlador')


var app = express();
app.set('view engine', 'ejs');

app.use(cors()).use(express.urlencoded({ extended: true })).use(express.json());

app.use('/vendor',express.static('vendor'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/template',express.static('template'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

ticket(app);
viaje(app);
tarea(app);

app.get('/', function(req,res){
  if(req.session.user === undefined){
    res.redirect('/login')
    console.log(req.session.user)
  }else{
    // if(req.session.permiso == 1)
      res.redirect('../ticket');
    console.log(req.session)
  }
})


app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/tareas', api.listarTareas)
app.get('/usuarios', api.listarUsuarios)
app.get('/productos', api.listarProductos)
app.get('/productos/:cliente', api.listarProductos)
app.get('/clientes', api.listarClientes)
//app.get('/tickets', api.listarTickets)

app.post('/login', cargar.login);
app.get('/logout', cargar.logout);

app.use((req, res, next) => {
  if(res.session != undefined){
    if(res.session.user != undefined){
      sql = "select * from usuario where user=?";
      data = [req.body.user]
      con.query(sql, data, (err, resultado)=>{
        if(!err){
          if(resultado.length !==0){
            req.session.user = resultado[0].user;
            req.session.user_id = resultado[0].id;
            req.session.estado = resultado[0].estado;
            req.session.permiso = resultado[0].permiso;
            req.session.cliente_id = resultado[0].cliente_id;
            next();
            // res.sendStatus(400)
          }
        }else{
          console.log(sql,err)
        }
      });
    }
  }
})

app.listen(89, function(){
  console.log("Servidor corriendo en puerto 89")
})
