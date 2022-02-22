$(document).ready(function(){
    $('#btnSave').hide();
     $('#txtlect').focus();   
   var fila_borrar=-1;
   var MisLecturas = localStorage.getItem("MisLecturas");
   MisLecturas = JSON.parse(MisLecturas);
   if(MisLecturas == null){ 
    MisLecturas = [];
   }else{
       MostrarLecturas();
   }
   $('#btnAdd').click(function(){
           AddLecturas();
   });
       $(document).on('click','#btnBorrar',function(){                         
                       fila_borrar = parseInt($(this).attr("alt")); 
                       MisLecturas.splice(fila_borrar, 1); 
                       localStorage.setItem("MisLecturas", JSON.stringify(MisLecturas));
                       alert("Registro de Lectura Eliminado");                                  
                       MostrarLecturas();               
       });
      
       $(document).on('click','#btnEditar',function(){ 
                   $('#btnAdd').hide();
                   fila_borrar=parseInt($(this).attr('alt'));
                   var Lectura = JSON.parse(MisLecturas[fila_borrar]); 
                   $("#txtlect").val(Lectura.idlectura);
                   $("#txtid").val(Lectura.idCliente);
                   $("#txtfecha").val(Lectura.feha);
                   $("#txtlectAnt").val(Lectura.lecturaAnterior);
                   $("#txtlectActu").val(Lectura.lecturaActual);
                   $("#txtpago").val(Lectura.pago);
                    $('#btnSave').show();                                               
       });
       $('#btnSave').click(function(){
           $('#btnAdd').show();
           MisLecturas [fila_borrar]= JSON.stringify({ 
                           idlectura : $("#txtlect").val(),
                           idCliente : $("#txtid").val(),
                           fecha : $("#txtfecha").val(),
                           lecturaAnterior : $("#txtlectAnt").val(),
                           lecturaActual : $("#txtlectActu").val(),
                           àgp : $("#ttpago").val(),
                       });
                       localStorage.setItem("MisLecturas", JSON.stringify(MisLecturas));
                       alert("Registro de Lecturas Actualizado");
                        $('#btnSave').hide(); 
                        $('input').val(''); 
                           $('#txtlect').focus();                        
                       MostrarLecturas();
       });
function AddLecturas(){
if ($.trim($('#txtlect').val())==''){            
               alert('Ingresa el id de la lectura');
               $('#txtlect').focus();
               return false;
   }

   if ($.trim($('#txtid').val())==''){         
       alert('Ingresa id del cliente');
       $('#txtid').focus();
       return false;
   }

   if ($.trim($('#txtfecha').val())==''){          
   alert('Ingresa la fecha');
   $('#txtfecha').focus();
   return false;
   }

   if ($.trim($('#txtlectAnt').val())==''){            
   alert('Ingresa la lectura anterior');
   $('#txtlectAnt').focus();
   return false;
   }

   if ($.trim($('#txtlectActu').val())==''){            
   alert('Ingresa la Lectura Actual');
   $('#txtlectActu').focus();
   return false;
   }

   if ($.trim($('#txtpago').val())==''){            
   alert('Ingresa pago');
   $('#txtpago').focus();
   return false;
   }
   
var students = JSON.stringify({       
   idlectura : $("#txtlect").val(),
   idCliente : $("#txtid").val(),
   lecturaAnterior : $("#txtfecha").val(),
   lecturaActual : $("#txtlectAnt").val(),
   fecha : $("#txtlectActu").val(),
   pago : $("#txtpago").val(),
});

MisLecturas.push(students);
localStorage.setItem("MisLecturas", JSON.stringify(MisLecturas));
alert("LEctura Registrada con Exito");
$('input').val('');
$('#txtlect').focus();
MostrarLecturas();
}

function MostrarLecturas()   {
$('#tblStudents tr:not(:first)').remove();
       for(var i in MisLecturas)
       {
           var con = JSON.parse(MisLecturas[i]);
       $('#tblStudents tr:last').after('<tr><td>'+con.codigo+'</td><td>'+con.nombre+'</td><td>'+con.direccion+'</td><td>'+con.telefono+'</td><td>'+con.fechnacimiento+'</td><td>'+con.sexo+'</td><td>'+'<button id="btnBorrar" alt="'+i+'" class="btn btn-danger btn-sm">Borrar</button>   <button id="btnEditar" alt="'+ i +'" class="btn btn-info btn-sm">Seleccionar</button>'+'</td></tr>');
       }
}

});