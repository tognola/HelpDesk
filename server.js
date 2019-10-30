var express = require('express');
var cors = require('cors');
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


app.listen(89, function(){
  console.log("Servidor corriendo en puerto 89")
})
