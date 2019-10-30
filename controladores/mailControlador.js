var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var notificarTicket = function(ticket){
  console.log(ticket);
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: 'backupmodulab@gmail.com',
          pass: 'Wm23361wm'
      }
  });
  const mailOptions = {
  from: 'backupmodulab@gmail.com', // sender address
  to: 'gtognola@wmargentina.com.ar, dvinokur@wmargentina.com.ar', // list of receivers
  subject: '['+ticket.cliente+'] '+ticket.titulo, // Subject line
  html: '<p>Comentario: <br />'+ticket.comentario+'</p> <br /> <a href=\"http://wmdesk.ddns.net/ticket/'+ticket.ticket_id+'\">Ver ticket</a> '// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });

}

module.exports = {
  notificarTicket : notificarTicket
}
