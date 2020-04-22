const mongoose = require("../db/mongodb-connection")
const DB = require("../db/DB")

class Empresa extends DB{

}

let empresa = new Empresa();
module.exports = empresa;