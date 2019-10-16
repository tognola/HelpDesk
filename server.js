var express = require('express');
var cors = require('cors');
var session = require('express-session')
var api = require('./controladores/listas')
var cargar = require('./controladores/cargar')
var ticket = require('./controladores/ticketControlador')
var viaje = require('./controladores/viajeControlador')


var app = express();
app.set('view engine', 'ejs');

app.use(cors()).use(express.urlencoded()).use(express.json()).use(express.urlencoded());
;
app.use('/vendor',express.static('vendor'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

ticket(app);
viaje(app);


// var nodemailer = require('nodemailer');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//
// var transporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//         user: 'backupmodulab@gmail.com',
//         pass: 'Wm23361wm'
//     }
// });
//

// app.post('/send', function(req,res){
//   console.log(req.body);
//
//   const mailOptions = {
//   from: 'backupmodulab@gmail.com', // sender address
//   to: 'tognola08@gmail.com', // list of receivers
//   subject: 'Subject of your email', // Subject line
//   html: '<p>Your html here</p>'// plain text body
// };

// transporter.sendMail(mailOptions, function (err, info) {
//    if(err)
//      console.log(err)
//    else
//      console.log(info);
// });
//
//
//   res.sendStatus(200);
// })

app.get('/', function(req,res){
  if(req.session.user === undefined){
    res.redirect('/login')
    console.log(req.session.user)
  }else{
    res.render('blank');
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

app.post('/nuevo_ticket', cargar.nuevoTicket);
app.post('/nuevo_viaje', cargar.nuevoViaje);
app.post('/login', cargar.login);


app.listen(8888, function(){
  console.log("Servidor corriendo en puerto 8888")
})
