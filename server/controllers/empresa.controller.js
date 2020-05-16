const empresa = require('../models/Empresa')

class EmpresaController{

    async MostrarEmpresas(req,res){
        let doc = await empresa.getCompanies({})
        if(doc) res.status(200).send(doc)
        else res.status(401).send("Error al buscar empresas")
    }

    async MostrarEmpresaPorEmail(req,res){
        let query = req.params.email
        let doc = await empresa.getCompanyByEmail(query)
        if(doc) res.status(200).send(doc)
        else res.status(401).send("Error al buscar empresas")
    }

    async CrearEmpresa(req,res){
        let {nombre, password, email} = req.body

        let uid = await empresa.getCompaniesCount() + 1 // obtiene el ultimo uid registrado y le suma 1
    
        let Company={
            uid: uid,
            nombre: nombre,
            password: password,
            email: email,
            tipo: "Empresa",
            ofertasEnProgreso: 0
        }

        if(nombre && password && email){
            let doc = await empresa.createCompany(Company)
            if(doc) res.status(200).send({"Empresa creada":Company})
            else{
                let verificacionCompany = await empresa.getCompanyByEmail(email)
                res.status(401).send({"Empresa ya existente":verificacionCompany})
            }
        }else res.status(400).send({error:"Faltan datos"}) // cuando no estan presentes nombre, password o email
    }


    async ActualizarEmpresa(req,res){

        let datos ={}

        if(true){
            if(req.body.nombre != undefined){
                datos.nombre = req.body.nombre
            }
            if(req.body.password != undefined){
                datos.password = req.body.password
            }
            if(req.body.tipo != undefined){
                datos.tipo = req.body.tipo
            }
            if(req.body.ofertasEnProgreso != undefined){
                datos.ofertasEnProgreso = req.body.ofertasEnProgreso
            }
        }

        if(req.params.email != undefined){
            let doc = await empresa.updateCompany(req.params.email, datos)
            if(doc) res.status(200).send({"Empesa actualizada":datos})
            else res.status(401).send({"Empresa no encontrada / Error":datos})
        }else{
            res.status(400).send("Falta email de empresa para poder actualizar")
        }
    }

    async EliminarEmpresa(req,res){
        if(req.params.email != undefined){

            let doc = await empresa.deleteCompany(req.params.email)
            if(doc){
                res.status(200).send({"Empresa eliminada":req.params.email})
            }else{
                res.status(401).send({"Empresa no encontrada":req.params.email})
            }
        }else{
            res.status(400).send({"Falta email":req.params.email})
        }
    }


    
}

const empresaController = new EmpresaController();
module.exports = empresaController;