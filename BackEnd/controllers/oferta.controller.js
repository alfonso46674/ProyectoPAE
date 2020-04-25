const oferta = require('../models/Oferta')

class OfertaController {
    async MostrarOfertas(req,res){
        let doc = await oferta.getDeals()
        if(doc) res.status(200).send(doc)
        else res.status(401).send("Error al buscar ofertas")
    }

    async MostrarOfertaPorId(req,res){
        let doc = await oferta.getDealById(req.params.id)
        if(doc) res.status(200).send(doc)
        else res.status(401).send({"Error al buscar oferta":req.params.id})
    }

    async CrearOferta(req,res){

    }

    async ActualizarOferta(req,res){

    }

    async EliminarOferta(req,res){
        if(req.body.uid != undefined){

            let doc = await oferta.deleteDeal(req.body.uid)
            if(doc){
                res.status(200).send({"Oferta eliminada":uid})
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