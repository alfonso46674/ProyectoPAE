const mongoose = require('../db/mongodb-connection')
const DB = require("../db/DB")

class Oferta extends DB{
    constructor(){
        super();

        this.schema = new mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            emailUsuario:{
                type: String,
                required: true
            },
            emailEmpresa:{
                type: String,
                required: true
            },
            salario:{
                type: Number,
                required: true
            },
            tiempoContratacion:{
                type: Number,
                required: true
            },
            estado:{
                type: String,
                required: true
            }
            
        });

        this._model = mongoose.model('ofertas', this.schema)
    }

    async getDeals(query){
        let doc = await super.query(query, {}, {})
        // console.log({"Ofertas":doc});
        return doc
    }

    async getDealById(uid){
        let doc =  await super.queryOne({uid},{},{})
        console.log({"Oferta especificamente buscada":uid});
        return doc
    }

    
    async createDeal(Deal){
        let doc = await this.getDealById(Deal.uid)
        console.log({"Create deal":doc});
        if(doc == null){ // si no existe la oferta se puede crear
            super.add(Deal);
            console.log({"Oferta creada":Deal});
            return true
        }else{
            console.log({"Error al crear la oferta":Deal});
            return false
        }
    }

    async updateDeal(uid, deal){
        let busquedaDeal = this.getDealById(uid)

        if(busquedaDeal != null){
            let doc = await super.update({uid},deal)
            console.log({"Oferta actualizada":doc});
            return true
        }else{
            console.log({"Oferta no actualizada":uid});
            return false
        }
    }


    async deleteDeal(uid){
        let Deal = await this.getDealById(uid)

        if(Deal != null){
            let doc = await super.delete({"uid":uid})

            if(doc){
                console.log({"Oferta eliminada":doc});
                return true
            }else{
                console.log({"Error al eliminar":uid});
                return false
            }
        }else{
            console.log({"Oferta no encontrada":uid});
            return false
        }
    }


    async getDealsCount(){
        let deals = await this.getDeals()
        if(deals.length != 0){
            return deals[deals.length-1].uid
        } else return 0
    }

    async getDealByUserAndCompany(emailUser, emailCompany){
        return await this.getDeals({emailUsuario:emailUser, emailEmpresa:emailCompany})
    }
}

let oferta = new Oferta()


// let ofertaPrueba = {
//     uid:1,
//     idUsuario:1,
//     idEmpresa:1,
//     salario: 30000,
//     tiempoContratacion: 2,
//     estado: "Activa"
// }

// oferta.add(ofertaPrueba)
// oferta.getDeals()

module.exports = oferta