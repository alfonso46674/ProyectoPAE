const usuario  = require('../models/Usuario')

class UsuarioController{
    async MostarUsuarios(req,res){
        let query = {} // parametros a buscar
        let options = {} // pagina  o limit
        let projection = {} // que quiero ver de la informacion
        let doc = await usuario.getUsers();
        if(doc) res.status(200).send(doc);
        else{
            res.status(401).send("Error al buscar usuarios")
        }
    }

    async MostrarUsuarioEmail(req,res){
        let query = req.params.email // parametros a buscar
        let options = {} // pagina  o limit
        let projection = {} // que quiero ver de la informacion
        let doc = await usuario.getUserByEmail(query);
        if(doc) res.status(200).send(doc)
        else{
            res.status(401).send("Error al buscar usuario")
        }
    }

     async CrearUsuario(req,res){
        
        let {nombre, apellido, email,password} = req.body
        
            let uid = await usuario.getUsersCount() + 1 // obtiene el uid el ultimo usuario agregado, y le suma 1
           
            let User={
                uid:uid,
                nombre: nombre,
                apellido: apellido,
                email:email,
                tipo: "Trabajador",
                ofertasActuales: 0,
                estado: "Disponible",
                password: password
            }
    
            if( nombre && apellido && email && password){
                let doc = await usuario.createUser(User);
                if(doc){
                    res.status(200).send({"Usuario creado":User})
                }else{
                    let verificacionUser = await usuario.getUserByEmail(email)
                    res.status(401).send({"Usuario ya existente":verificacionUser})
                }
                
    
                }
                else{
                    res.status(400).send({error:"Faltan datos"})
                }
       

       
    }

    async ActualizarUsuario(req,res){

        // let {nombre, apellido, email, tipo, ofertasActuales, estado} = req.body
        let datos = {}
        if(true){
            if(req.body.nombre != undefined){
                datos.nombre = req.body.nombre
            }
            if(req.body.apellido != undefined){
                datos.apellido = req.body.apellido
            }
            if(req.body.email != undefined){
                datos.email = req.body.email
            }
            if(req.body.tipo != undefined){
                datos.tipo = req.body.tipo
            }
            if(req.body.ofertasActuales != undefined){
                datos.ofertasActuales = req.body.ofertasActuales
            }
            if(req.body.estado != undefined){
                datos.estado = req.body.estado
            }
            if(req.body.password != undefined){
                datos.password = req.body.password
            }
            // console.log({"Objeto datos": datos})
        }
        
        if(req.body.email != undefined){
            let doc = await usuario.updateUser(req.body.email, datos)
            if(doc == true){
                res.status(200).send({"Usuario actualizado":datos})
            }else{
                res.status(401).send({"Usuario no encontrado / Error":datos})
            }
        }else{
            res.status(400).send("Falta email de usuario para poder actualizar")
        }
    }

    async EliminarUsuario(req,res){

        if(req.body.email != undefined ){

            let doc = await usuario.deleteUser(req.body.email)
            console.log(doc);
            if(doc){
                res.status(200).send({"Usuario eliminado":req.body.email})
            }else{
                res.status(401).send({"Usuario no encontrado":req.body.email})
            }

        }else{
            res.status(400).send({"Falta email":req.body.email})
        }
    }

}
const usuarioController = new UsuarioController();
module.exports = usuarioController;