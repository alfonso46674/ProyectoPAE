const oferta = require('../models/Oferta')
const usuario = require('../models/Usuario')
const empresa = require('../models/Empresa')

class OfertaController {
    async MostrarOfertas(req,res){
        let doc = await oferta.getDeals({})
        if(doc) res.status(200).send(doc)
        else res.status(401).send("Error al buscar ofertas")
    }

    async MostrarOfertaPorId(req,res){
        let doc = await oferta.getDealById(req.params.id)
        if(doc) res.status(200).send(doc)
        else res.status(401).send({"Error al buscar oferta":req.params.id})
    }

    async MostrarOfertaPoEmpresaPorUsuario(req,res){
        let doc = await oferta.getDeals({emailEmpresa: req.params.emailEmpresa, emailUsuario: req.params.emailUsuario})
        if(doc) res.status(200).send(doc)
        else res.status(401).send("Error al buscar oferta")
    }

    async MostrarOfertasdeEmpresa(req,res){
        let doc = await oferta.getDeals({emailEmpresa:req.params.correo})
        if(doc) res.status(200).send(doc)
        else res.status(401).send({"Error al buscar ofertas de la empresa": req.params.correo})
    }

    async MostarOfertasdeUsuario(req,res){
        let doc = await oferta.getDeals({emailUsuario: req.params.correo})
        if(doc) res.status(200).send(doc)
        else res.status(401).send({"Error al buscar ofertas del usuario":req.params.correo})
    }

    async CrearOferta(req,res){
        let user = await usuario.getUserByEmail(req.body.emailUsuario);
        let company = await empresa.getCompanyByEmail(req.body.emailEmpresa); 
        

        if(user != null && company != null){ // significa que existe el usuario y la empresa
           
            let uid = await oferta.getDealsCount() + 1
 
             let Oferta ={
                 uid: uid,
                 emailUsuario: req.body.emailUsuario,
                 emailEmpresa: req.body.emailEmpresa,
                 salario: req.body.salario,
                 tiempoContratacion: req.body.tiempoContratacion,
                 estado: "Activa"
             }
             //solo puede existir una oferta con la misma combinacion de userEmail y companyEmail
             let DealsEnExistencia = await oferta.getDeals({emailUsuario:req.body.emailUsuario, emailEmpresa: req.body.emailEmpresa})
             
             if(DealsEnExistencia.length == 0){ // si no hay ninguna oferta con la combinacion del email del usuario y la compañia, se puede crear la oferta
                let doc = await oferta.createDeal(Oferta)

                if(doc) { // si se creo la oferta, se deben actualizar los contadores de ofertas del usuario y la empresa

                    let userActualizado = await usuario.updateUser(req.body.emailUsuario, {ofertasActuales:user.ofertasActuales + 1});
                    let empresaActualizada = await empresa.updateCompany(req.body.emailEmpresa, {ofertasEnProgreso: company.ofertasEnProgreso + 1 });
                    
                    
                    res.status(200).send({"Oferta creada": Oferta})
                    }
                else {
                    let ofertaExistente = await oferta.getDealById(uid)
                    res.status(401).send({"Oferta ya existente":ofertaExistente})
                }
             }else{
                 res.status(401).send({"Oferta ya existente":DealsEnExistencia})
             }
         }
         else{
             res.status(400).send({error:"Faltan datos / Datos incorrectos"})
         }
        

    }

    async ActualizarOferta(req,res){
        let datos = {}

        if(true){
            if(req.body.salario != undefined){
                datos.salario = req.body.salario
            }
            if(req.body.tiempoContratacion != undefined){
                datos.tiempoContratacion = req.body.tiempoContratacion
            }
            if(req.body.estado != undefined){
                datos.estado = req.body.estado
            }
        }

        let ofertaActualizar = await oferta.getDealByUserAndCompany(req.params.emailUsuario, req.params.emailEmpresa)
        if(ofertaActualizar.length == 1){
            
            let doc = await oferta.updateDeal(ofertaActualizar[0].uid, datos)
            if(doc) res.status(200).send({"Oferta actualizada":datos})
            else res.status(401).send({"Error al actualizar":datos})
        }else res.status(401).send({"Oferta no encontrada con los datos proporcionados":datos})
    }

    async EliminarOferta(req,res){
        if(req.params.emailEmpresa != undefined && req.params.emailUsuario != undefined){
             
            //crear copia de la oferta
            let dealCopy = await oferta.getDealByUserAndCompany(req.params.emailUsuario, req.params.emailEmpresa)
             dealCopy = dealCopy[0]
            console.log(dealCopy);

            let doc = await oferta.deleteDeal(dealCopy.uid)
            if(doc){ // se debe actualizar el contador de oferta del usuario y de la empresa

                //obtener el email de usuario y de la empresa a partir del uid de la copia de la oferta
                let user = await usuario.getUserByEmail(dealCopy.emailUsuario)
                let company = await empresa.getCompanyByEmail(dealCopy.emailEmpresa)
                
                //actualizar las ofertas del usuario y de la empresa
                let userAct = await usuario.updateUser(dealCopy.emailUsuario, {ofertasActuales: user.ofertasActuales - 1});
                let companyAct = await empresa.updateCompany(dealCopy.emailEmpresa, {ofertasEnProgreso: company.ofertasEnProgreso - 1});

                //Enviar el status y mensaje de eliminacion
                res.status(200).send({"Oferta eliminada: ":dealCopy})
            }else{
                res.status(401).send({"Oferta no encontrada":dealCopy})
            }

        }else{
            res.status(400).send("Faltan correos de empresa y de usuario para eliminar oferta")
        }
    }
}

const ofertaController = new OfertaController()
module.exports = ofertaController