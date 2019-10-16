// Al finalizarse de cargar el DOM:



$(function() {
  var server = "http://localhost:8888";
  var nuevoTicket = CrearTicketVista(server);
  /*$("#sendMail").click(function(){
    var nombre = $("#firstName").val();
    var apellido = $("#lastName").val();
    var mail = $("#inputEmail").val();
    var contenido = {
      nombre: nombre,
      apellido: apellido,
      contenido: mail
    }
    console.log(contenido)

    fetch(server + '/send', {
       method: 'post',
       headers: {
         'Accept': 'application/json, text/plain, /*',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(contenido)
       }).then(function(response) {
         //return response.json();
         console.log(response)
       });
  })*/
});
