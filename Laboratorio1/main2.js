var miDBAlumnos= openDatabase('dbAlumnos','1.0','Aplicacion de Alumnos',5*1024*1024);
window.id = 0;
if(!miDBAlumnos){
    alert("Elnavegador no soporta Web SQL");
}
var appVue = new Vue({
    el:'#appAlumnos',
    data:{
        buscar      :'',
        alumno:{
            
            idAlumno    : 0,
            codigo      : '',
            nombre      : '',
            direccion   : '',
            materia     : '',
            docente     : '',
            grupo       : '',
            img         : '/images/no_imagen2.png'
        },
        alumnos:[]
    },
    methods:{
        guardarAlumnos(){
            /**
             * BD Web SQL
             */
            miDBAlumnos.transaction(tran=>{
                tran.executeSql('INSERT INTO alumnos(idAlumno,codigo,nombre,direccion,materia,docente,grupo,img) VALUES(?,?,?,?,?) ',
                    [++id,this.alumno.codigo,this.alumno.nombre,this.alumno.direccion, this.alumno.materia, this.alumno.docente, this.alumno.grupo, this.alumno.img]);
                this.obtenerAlumnos();
                this.limpiar();
                this.modificar();
            }, err=>{
                console.log( err );
            });
        },
        modificar(){
            miDBAlumnos.transaction(tran=>{
                tran.executeSql('UPDATE alumnos SET codigo, nombre, direccion, materia, docente, grupo img WHERE idAlumno = idAlumno');
                this.obtenerAlumnos();
                this.limpiar();
            }, err=>{
                console.log( err );
            });
        },
        obtenerImg(e){
            
            let rutaTemp = URL.createObjectURL(e.target.files[0]);
            this.alumno.img = rutaTemp;
        },
        buscandoAlumno(){
            if( this.buscar.trim().length>0 ){
                this.alumno = this.alumno.filter(cliente => 
                    alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase()) > -1 || 
                    alumno.codigo.toLowerCase().indexOf(this.buscar.toLowerCase()) > -1 ||
                    alumno.direccion.toLowerCase().indexOf(this.buscar.toLowerCase()) > -1
                );
            }else{
                this.obtenerAlumnos();
            }
            this.obtenerAlumnos(this.buscar);
        },
        obtenerAlumnos(){
            miDBAlumnos.transaction(tran=>{
                tran.executeSql('SELECT * FROM alumnos',[],(index,data)=>{
                    this.alumnos = data.rows;
                    id=data.rows.length;
                });
            }, err=>{
                console.log( err );
            });
        },
        mostrarAlumnos(pro){
            this.alumno = pro;
        },
        limpiar(){
            this.alumno.codigo='';
            this.alumno.nombre='';
            this.alumno.nombre='';
            this.alumno.materia='';
            this.alumno.docente='';
            this.alumno.grupo='';
            this.alumno.img='';
        }
    },
    created(){
        miDBAlumnos.transaction(tran=>{
            tran.executeSql('CREATE TABLE IF NOT EXISTS alumnos(idAlumno int PRIMARY KEY NOT NULL, codigo varchar(10), nombre varchar(65), direccion varchar(100), materia varchar(100), docente varchar(100), grupo varchar(100), img varchar(100))');
        }, err=>{
            console.log( err );
        });
        this.obtenerAlumnos();
    }
});