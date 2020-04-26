const axios = require('axios')
const randomString = require('randomstring')

const url = 'http://localhost:3000'


//canales
const canalRegistro = 'hi';
let canalEmpresa = "";


exports = module.exports = function(socket,io){
    // socket.on(canalEmpresa, function(msg){
    //     console.log("el cliente manda el siguient emensaje",msg);
    //     socket.emit(canalEmpresa,"Respuesta del servidor a mensaje " + msg);
    // });
    

    socket.on(canalRegistro, async (correo)=>{
        
        console.log("El cliente manda el siguiente correo de empresa: ",correo);
        
        // se verifica que exista la empresa con su correo
        let doc = await verificarEmpresa(correo)
       

        if(doc){
            
            socket.emit(canalRegistro, "Empresa verificada: " + correo)



            // se crea una sala especifica para la empresa basada en su correo para ver las ofertas que ha hecho
            canalEmpresa = correo;
            console.log("canal Empresa",canalEmpresa);
            
            socket.on(canalEmpresa, async()=>{
                let ofertas = await mostrarOfertasDeEmpresa(correo)
                socket.emit(canalEmpresa, ofertas)
            })

            



        }else{
            socket.emit(canalRegistro, "Empresa no existente: " + correo)
        }
    })



    function RegistrarEmpresa(correo, socketId){
     let code = randomString.generate(8)
      return {correo, socketId, code}
    }

    async function verificarEmpresa(correo){
        try{
            let res = await axios.get(url+'/empresas/'+correo)
            return true;
        }catch(error){
            // console.log("Empresa no encontrada",error.data);
            return false;
        }
    }

    async function mostrarOfertasDeEmpresa(correo){
        try{
            let res = await axios.get(url+'/ofertas/empresa/'+correo)

            //quita propiedades que no se deben mostrar
            for(let i = 0; i < res.data.length; i++){
                delete res.data[i]._id
                delete res.data[i].__v
            }
            return res.data
        }catch(err){
            console.log("Error al mostrar ofertas de empresa");
            return false;
        }
    }




}