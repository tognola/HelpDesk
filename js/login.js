$(function(){
  $("#login").click(function(){
    var user = {
      //fecha_creacion: new Date($("#fecha").val()).toLocaleString(),
      user:  $("#inputUser").val(),
      pass:  $("#inputPassword").val(),
    }

    console.log(user)
    fetch('/login', {
       method: 'post',
       headers: {
         'Accept': 'application/json, text/plain, /*',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
       }).then(function(response) {
         console.log(response)
         window.location.href = "./";
         return response.json();
       });

       //return false;
  });
});
