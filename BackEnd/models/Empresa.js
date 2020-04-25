const mongoose = require("../db/mongodb-connection")
const DB = require("../db/DB")

class Empresa extends DB{
    constructor(){
        super();

        this.schema = new mongoose.Schema({
            uid:{
                type: Number,
                unique: true
            },
            nombre:{
                type: String,
                required: true
            },
            password:{
                type: Number,
                required: true
            },
            email:{
                type: String,
                unique: true
            },
            tipo:{
                type: String,
                required: true
            },
            ofertasEnProgreso:{
                type: Number,
                required: true
            }
        });
        this._model = mongoose.model('empresas', this.schema)
    }

    async getCompanies(){
        return await super.query({},{},{})
    }

    async getCompanyByEmail(email){
        return await super.queryOne({email},{},{})
    }

    async createCompany(Company){
        let doc = await this.getCompanyByEmail(Company.email)

        if(doc == null){ // si no hay empresa registrada bajo ese email
            super.add(Company);
            console.log({"Empresa creada":Company});
            return true;
        }else{ // si ya esta registrado ese email
            console.log({"Error al crear empresa":Company});
            return false;
        }
    }


    async deleteCompany(email){
        let Company = await this.getCompanyByEmail(email)

        if(Company != null){ // si existe una empresa con ese email
            let doc = await super.delete({"email":email})

            if(doc){ // si se elimino correctamente
                console.log({"Empresa eliminada":doc});
                return true;
            }else{
                console.log({"Error al eliminar":doc});
                return false;
            }
        }else{
            console.log({"Empresa no encontrada":email});
            return false;
        }
    }

    async updateCompany(email,Company){
        let busquedaCompany = await this.getCompanyByEmail(email);

        if(busquedaCompany != null){ // si existe una empresa con ese email
            let doc = await super.update({email},Company)
            console.log({"Empresa actualizado":doc})
            return true
        }else{ // si no se encontro una empresa con ese email
            console.log({"Empresa no actualizada":email});
            return false
        }
    }

    

    async getCompaniesCount(){ // regresa el ultimo uid registrado
        let Companies = await this.getCompanies()
        if(Companies.length != 0){
            return Companies[Companies.length - 1 ].uid
        } else return 0
    }
}

let empresa = new Empresa();


let empresaPrueba ={
    uid:1,
    nombre: "Telcel",
    password: "123",
    email:"Telcel@1",
    tipo:"Empresa",
    ofertasEnProgreso:0
}

// empresa.createCompany(empresaPrueba)

module.exports = empresa;