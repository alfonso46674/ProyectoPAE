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
                unique: true
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

    
    async getUsers(query, projection={}, options={}){ // regresa todos los usuarios
        return await super.query(query, projection, options);
        // let doc = await super.query(query, projection, options)
        // console.log(doc);
        // return doc
    }

    async getUserByEmail(email){ // regresa usuario por email
        let doc =  await super.queryOne({email},{},{})
        return doc
    }

    //revisa si existe el usuario, sino existe lo crea
    async createUser(User){ 
        let doc = await this.getUserByEmail(User.email)
        // console.log(doc);
        if(doc == null){
            super.add(User);
            // console.log("Usuario creado");
            return true;
        }  
        else{
            // console.log({"Error al crear al usuario":doc});
            return false;
        }

    }

    async deleteUser(email){
        let User = await this.getUserByEmail(email)

        if(User != null){

            let doc = await super.delete({"email":email})
            if(doc) {
                console.log({"Usuario eliminado":doc});
                return true
                }
            else {
                console.log({"Error al eliminar":email});
                return false
                }

        }else{
            console.log({"Usuario no encontrado":email});
            return false
        }
        
    }

    async updateUser(email,User){
        let doc = await this.getUserByEmail(email)

        if(doc != null){
            let doc2 = await super.update({email},User)
            console.log({"Usuario actualizado":doc2});
            return true
        }else{
            console.log({"Usuario no actualizado":email});
            return false
        }
        
    }

    async getUsersCount(){ // regresa el ultimo uid
        let users = await this.getUsers()
        let value = users[users.length-1].uid
        // console.log(users[users.length-1].uid);
        return value
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

// usuario.getUserByEmail("Carlos@132")


// usuario.createUser(usuarioPrueba)
// usuario.createUser(usuarioPrueba)

// usuario.getUsers({},{},{});

// usuario.deleteUser(usuarioPrueba)

// usuario.createUser(usuarioPrueba)

// usuario.updateUser("Carlos@1",usuarioPrueba)

// usuario.getUsersCount()

module.exports = usuario