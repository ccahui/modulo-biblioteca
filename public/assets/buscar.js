$( document ).ready(function() {
    console.log( "ready!" );
    $( "#buttonBuscar" ).click(function() {
        //   alert( "Handler for .click() called." );
        let termino =  $("#termino").val();
        if(termino != '')
            window.location.href = "/buscar/libro/"+termino;
        return false;
      });
    
});