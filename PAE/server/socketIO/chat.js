// const axios = require('axios')

const deal = require('../models/Oferta')
const user  = require('../models/Usuario')
const company = require('../models/Empresa')

const url = 'http://localhost:3000' // usado para axios


//canales
const canalRegistro = 'Inicio';


exports = module.exports = function(socket,io){
    socket.on('hi',function(msg){
        console.log("el cliente manda el siguiente mensaje",msg);
        socket.emit('hi', 'Respuesta del servidor al mensaje' + msg);
    });

    setInterval(()=>{
        io.emit('hi','hola ya son las '+ (new Date()).toUTCString())
    },8000)
}



// exports = module.exports = function(socket,io){
//     // socket.on(canalEmpresa, function(msg){
//     //     console.log("el cliente manda el siguient emensaje",msg);
//     //     socket.emit(canalEmpresa,"Respuesta del servidor a mensaje " + msg);
//     // });
    

//     socket.on(canalRegistro, async (correo)=>{
        
//         console.log("El cliente manda el siguiente correo de empresa: ",correo);
        

        

//         // se verifica que exista la empresa con su correo
//         let doc = await verificarEmpresa_PorModelo(correo)
       

//         if(doc){
            
//             socket.emit(canalRegistro, "Empresa verificada: " + correo)



//             // se crea una sala de empresa basada en su correo
//              //Se muestran todas las ofertas que ha hecho la empresa a diferentes usuarios
//             console.log("canal Empresa",correo);
            
//             socket.on(correo, async(msg)=>{
                
//                 //Solamente muestra las ofertas si no se manda algun mensaje
//                 if(msg == undefined || msg == ""){
                    
//                 let ofertasEmpresa = await mostrarOfertasDeEmpresa_PorModelo(correo)
//                 socket.emit(correo, ofertasEmpresa)
//                 }
                
//                 //si se manda un mensaje, aqui se analiza
//                 else{
                    
//                     let doc = await verificarUsuario_PorModelo(msg)
//                     if(doc){ // significa que existe un usuario con ese correo
                       
//                         //Se notifica que se creara una sala para ver las ofertas del usuario
//                         socket.emit(correo, "Sala creada para las ofertas del usuario: "+msg);

//                        //Se crea una sala de usuario con el correo del usuario
//                        //Muestra todas las ofertas que ha recibido ese usuario, sin importar la empresa
//                         let correoUsuario = msg;
//                         socket.on(correoUsuario, async()=>{
//                             let ofertasUsuario = await mostrarOfertasDeUsuario_PorModelo(correoUsuario)
//                             socket.emit(correoUsuario, ofertasUsuario)
//                         })




//                     }else{ // no existe un usuario con msg como su email
//                         socket.emit(correo, "No existe un usuario con este email: "+msg)
//                     }
//                 }
//             })
            

//         // si verificarEmpresa regresa false, significa que no existe una empresa con ese correo
//         }else{
//             socket.emit(canalRegistro, "Empresa no existente: " + correo)
//         }
//     })


//     //funciones de busqueda y verificacion usando las funciones de los modelos
//     async function verificarEmpresa_PorModelo(correo){
//         let res = await company.getCompanyByEmail(correo)
//         // console.log(res);
//         if(res!=null) return true
//         else return false
//     }


//     async function verificarUsuario_PorModelo(correo){
//         let res = await user.getUserByEmail(correo)
//         if(res!=null) return true
//         else return false
//     }

//     async function mostrarOfertasDeEmpresa_PorModelo(correo){
//         let res = await deal.getDeals({emailEmpresa:correo})
//         if(res!=null){
//             return eliminarPropiedades(res)
//         }
//         else return false
//     }

//     async function mostrarOfertasDeUsuario_PorModelo(correo){
//         let res = await deal.getDeals({emailUsuario:correo})
//         if(res!=null) return eliminarPropiedades(res)
//         else return false
//     }
    

//      //Elimina propiedades no necesarias de las ofertas
//      function eliminarPropiedades(data){
//         let arr = new Array()
//        for(let i = 0; i < data.length; i++){
//            let obj = {
//                uid: data[i].uid,
//                emailUsuario: data[i].emailUsuario,
//                emailEmpresa: data[i].emailEmpresa,
//                salario: data[i].salario,
//                tiempoContratacion: data[i].tiempoContratacion,
//                estado: data[i].estado
//            }
//            arr.push(obj)
//        }
//         return arr
//     }



//     //Mismas funciones pero con axios; haciendo peticiones http
//     //No se terminaron usando ya que dependen de la url de donde se ejecuta

//     async function verificarEmpresa_PorAxios(correo){
//         try{
//             let res = await axios.get(url+'/empresas/'+correo)
//             return true;
//         }catch(error){
//             // console.log("Empresa no encontrada",error.data);
//             return false;
//         }
//     }


//     async function verificarUsuario_PorAxios(correo){
//         try{
//             let res = await axios.get(url+'/usuarios/'+correo)
//             return true
//         }catch(error){
//             return false
//         }
//     }

//     async function mostrarOfertasDeEmpresa_PorAxios(correo){
//         try{
//             let res = await axios.get(url+'/ofertas/empresa/'+correo)

//             //quita propiedades que no se deben mostrar
//             return eliminarPropiedades(res.data)
//         }catch(err){
//             console.log("Error al mostrar ofertas de empresa");
//             return false;
//         }
//     }


//     async function mostrarOfertasDeUsuario_PorAxios(correo){
//         try{
//             let res = await axios.get(url+'/ofertas/usuario/'+correo)
//             return eliminarPropiedades(res.data)
//         }catch(error){
//             console.log("Error al mostrar ofertas de usuario");
//             return false;
//         }
//     }


   
// }