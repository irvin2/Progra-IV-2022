$(document).ready(function(){
    $('#btnSave').hide();
     $('#txtnombre').focus();   
   var fila_borrar=-1;
   var MisClientes = localStorage.getItem("MisClientes");
   MisClientes = JSON.parse(MisClientes);
   if(MisClientes == null){ 
        MisClientes = [];
   }else{
       MostrarClientes();
   }
   $('#btnAdd').click(function(){
           AddClientes();
   });
   
       $(document).on('click','#btnBorrar',function(){                         
                       fila_borrar = parseInt($(this).attr("alt")); 
                       MisClientes.splice(fila_borrar, 1); 
                       localStorage.setItem("MisClientes", JSON.stringify(MisClientes));
                       alert("Cliente Eliminado");                                  
                       MostrarClientes();               
       });
      
       $(document).on('click','#btnEditar',function(){ 
                   $('#btnAdd').hide();
                   fila_borrar=parseInt($(this).attr('alt'));
                   var clientes = JSON.parse(MisClientes[fila_borrar]);
                   $("#txtid").val(clientes.idcliente); 
                   $("#txtcod").val(clientes.codigo);
                   $("#txtnombre").val(clientes.nombre);
                   $("#txtdireccion").val(clientes.direccion);
                   $("#txtzona").val(clientes.zona);
                    $('#btnSave').show();                                               
           
       });
       $('#btnSave').click(function(){
           $('#btnAdd').show();
           MisClientes [fila_borrar]= JSON.stringify({ 
                           idcliente : $("#txtid").val(),
                           codigo : $("#txtcod").val(),
                           nombre : $("#txtnombre").val(),
                           direccion : $("#txtdireccion").val(),
                           zona : $("#txtzona").val()
                       });
                       localStorage.setItem("MisClientes", JSON.stringify(MisClientes));
                       alert("Registro Actualizado");
                        $('#btnSave').hide(); 
                        $('input').val(''); 
                           $('#txtnombre').focus();                        
                       MostrarClientes();
       });

function AddClientes(){
    if ($.trim($('#txtid').val())==''){            
        alert('Ingresa el id del cliente');
        $('#txtid').focus();
        return false;
}
    if ($.trim($('#txtcod').val())==''){            
                alert('Ingresa el codigo');
                $('#txtcod').focus();
                return false;
    }

   if ($.trim($('#txtnombre').val())==''){         
       alert('Ingresa el nombre');
       $('#txtnombre').focus();
       return false;
   }

   if ($.trim($('#txtdireccion').val())==''){          
   alert('Ingresa la direccion');
   $('#txtdireccion').focus();
   return false;
   }
   if ($.trim($('#txtzona').val())==''){          
    alert('Ingresa la zona');
    $('#txtzona').focus();
    return false;
    }
var clientes = JSON.stringify({   
   idcliente : $("#txtid").val(),    
   codigo : $("#txtcod").val(),
   nombre : $("#txtnombre").val(),
   direccion : $("#txtdireccion").val(),
   zona : $("#txtzona").val(),
});

MisClientes.push(clientes);
localStorage.setItem("MisClientes", JSON.stringify(MisClientes));
alert("Cliente Registrada/o con Exito");
$('input').val('');
$('#txtnombre').focus();
MostrarClientes();
}

function MostrarClientes()   {
$('#tblclientes tr:not(:first)').remove();
       for(var i in MisClientes)
       {
           var con = JSON.parse(MisClientes[i]);
       $('#tblclientes tr:last').after('<tr><>'+con.idcliente+'<tr><td>'+con.codigo+'</td><td>'+con.nombre+'</td><td>'+con.direccion+'<tr><>'+con.zona+' <button id="btnBorrar" alt="'+i+'" class="btn btn-danger btn-sm">Borrar</button>   <button id="btnEditar" alt="'+ i +'" class="btn btn-info btn-sm">Seleccionar</button>'+'</td></tr>');
       }
}

});