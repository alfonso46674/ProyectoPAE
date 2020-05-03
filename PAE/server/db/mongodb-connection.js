const mongoose = require('mongoose')
const config = require('../config/config');

// let url = "mongodb+srv://admin:admin@cluster0-ql4pi.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(config.dbUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database ",err);
});


module.exports = mongoose;