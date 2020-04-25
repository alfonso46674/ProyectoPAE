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
                if(doc) res.status(200).send({"Oferta creada": Oferta})
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
            if(req.body.emailUsuario != undefined){
                datos.emailUsuario = req.body.emailUsuario
            }
            if(req.body.emailEmpresa != undefined){
                datos.emailEmpresa = req.body.emailEmpresa
            }
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

        let ofertaActualizar = await oferta.getDealByUserAndCompany(req.body.emailUsuario, req.body.emailEmpresa)
        if(ofertaActualizar.length == 1){
            
            let doc = await oferta.updateDeal(ofertaActualizar[0].uid, datos)
            if(doc) res.status(200).send({"Oferta actualizada":datos})
            else res.status(401).send({"Error al actualizar":datos})
        }else res.status(401).send({"Oferta no encontrada con los datos proporcionados":datos})
    }

    async EliminarOferta(req,res){
        if(req.body.uid != undefined){

            let doc = await oferta.deleteDeal(req.body.uid)
            if(doc){
                res.status(200).send({"Oferta eliminada con id: ":req.body.uid})
            }else{
                res.status(401).send({"Oferta no encontrada":req.body.uid})
            }

        }else{
            res.status(400).send({"Falta uid de oferta":req.body.uid})
        }
    }
}

const ofertaController = new OfertaController()
module.exports = ofertaController