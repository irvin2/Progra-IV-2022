$(document).ready(function(){
    $('#btnSave').hide();
     $('#txtnombre').focus();   
   var fila_borrar=-1;
   var MisMaterias = localStorage.getItem("MisMaterias");
   MisMaterias = JSON.parse(MisMaterias);
   if(MisMaterias == null){ 
       MisMaterias = [];
   }else{
       MostrarMaterias();
   }
   $('#btnAdd').click(function(){
           AddMaterias();
   });
   
       $(document).on('click','#btnBorrar',function(){                         
                       fila_borrar = parseInt($(this).attr("alt")); 
                       MisMaterias.splice(fila_borrar, 1); 
                       localStorage.setItem("MisMaterias", JSON.stringify(MisMaterias));
                       alert("Materia Eliminada");                                  
                       MostrarMaterias();               
       });
      
       $(document).on('click','#btnEditar',function(){ 
                   $('#btnAdd').hide();
                   fila_borrar=parseInt($(this).attr('alt'));
                   var materias = JSON.parse(MisMaterias[fila_borrar]); 
                   $("#txtcod").val(materias.codigo);
                   $("#txtnombre").val(materias.nombre);
                   $("#txtdocente").val(materias.docente);
                    $('#btnSave').show();                                               
           
       });
       $('#btnSave').click(function(){
           $('#btnAdd').show();
                           MisMaterias [fila_borrar]= JSON.stringify({ 
                           codigo : $("#txtcod").val(),
                           nombre : $("#txtnombre").val(),
                           direccion : $("#txtdocente").val(),
                       });
                       localStorage.setItem("MisMaterias", JSON.stringify(MisMaterias));
                       alert("Registro Actualizado");
                        $('#btnSave').hide(); 
                        $('input').val(''); 
                           $('#txtnombre').focus();                        
                       MostrarMaterias();
       });

function AddMaterias(){
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

   if ($.trim($('#txtdocente').val())==''){          
   alert('Ingresa el nombre del docente');
   $('#txtdocente').focus();
   return false;
   }
var materias = JSON.stringify({       
   codigo : $("#txtcod").val(),
   nombre : $("#txtnombre").val(),
   docente : $("#txtdocente").val(),
});

MisMaterias.push(materias);
localStorage.setItem("MisMaterias", JSON.stringify(MisMaterias));
alert("Materia Registrada con Exito");
$('input').val('');
$('#txtnombre').focus();
MostrarMaterias();
}

function MostrarMaterias()   {
$('#tblMAterias tr:not(:first)').remove();
       for(var i in MisMaterias)
       {
           var con = JSON.parse(MisMaterias[i]);
       $('#tblMaterias tr:last').after('<tr><td>'+con.codigo+'</td><td>'+con.nombre+'</td><td>'+con.docente+'<button id="btnBorrar" alt="'+i+'" class="btn btn-danger btn-sm">Borrar</button>   <button id="btnEditar" alt="'+ i +'" class="btn btn-info btn-sm">Seleccionar</button>'+'</td></tr>');
       }
}

});