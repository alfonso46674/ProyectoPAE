const mongoose = require('../db/mongodb-connection')
const DB = require('../db/DB')

class Usuario extends DB{
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
            apellido:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            },
            tipo:{
                type: String,
                required: true
            },
            ofertasActuales:{
                type: Number,
                required: true
            },
            estado:{
                type: String,
                required: true
            }
        });
        this._model = mongoose.model('usuarios', this.schema)
    }

    
    async getUsers(query, projection="", options={}){ // regresa todos los usuarios
        return await super.query(query, projection, options);
        // let doc = await super.query(query, projection, options)
        // console.log(doc);
        // return doc
    }

    async getUserById(email){ // regresa usuario por id
        return await super.queryOne(email,{},{})
    }

    //revisa si existe el usuario, sino existe lo crea
    async createUser(User){ 
        let doc = await super.exists(User)
        if(doc == false){
            super.add(User);
            console.log("Usuario creado");
        }  
        else{
            console.log({"Error al crear al usuario":doc});
        }

    }

    async deleteUser(User){
        let doc = await super.delete(User)
        if(doc) console.log({"Usuario eliminado":doc});
        else console.log("Usuario no encontrado");
    }

    async updateUser(email,User){
        let doc = await super.exists({email})
        if(doc != false){
            let doc2 = await super.update({email},User)
            console.log({"Usuario actualizado":doc2});
        }
        
    }
};

let usuario = new Usuario()

let usuarioPrueba = {
    uid: 1,
    nombre: "Carlos",
    apellido: "Doe",
    email: "Carlos@1",
    tipo: "Trabajador",
    ofertasActuales: 0,
    estado: "Disponible"
}

// usuario.createUser(usuarioPrueba)
// usuario.createUser(usuarioPrueba)

// usuario.getUsers({},{},{});

// usuario.deleteUser(usuarioPrueba)

// usuario.createUser(usuarioPrueba)

// usuario.updateUser("Carlos@1",usuarioPrueba)


module.exports = usuario