var CrearTicketVista = function(server){
  this.server = server;


  fetch(server+"/clientes").then((response) => {
    return response.json()
  }).then((data) => {cargarClientes(data)});

  fetch(server+"/productos").then((response) => {
    return response.json()
  }).then((data) => {cargarProductos(data)});

  $("#enviarTicket").click(function(){
    var ticket = {
      //fecha_creacion: new Date($("#fecha").val()).toLocaleString(),
      user_id: 1,
      cliente_id:  $("#cliente").val(),
      producto_id:  $("#producto").val(),
      titulo: $("#titulo").val(),
      comentario: $("#comentario").val()
    }

    fetch(server + '/nuevo_ticket', {
       method: 'post',
       headers: {
         'Accept': 'application/json, text/plain, /*',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(ticket)
       }).then(function(response) {
         //return response.json();
         if(response.status == 200){location.reload()}
       });
  });

}

var cargarClientes = function(clientes){
  clientes.forEach((cliente) => {
    $("#cliente").append("<option value=\""+cliente.id+"\">"+cliente.nombre+"</option>")
  })
}

var cargarProductos = function(data){
  data.forEach((producto) => {
    $("#producto").append("<option value=\""+producto.id+"\">"+producto.nombre+"</option>")
  })
}

// var enviarTicket =
