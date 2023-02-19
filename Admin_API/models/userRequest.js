const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const RequestSchema = mongoose.Schema({

    userEmail : {
        type: String,
        required: true,
        unique: true
    },
    Requ : {
        type : String,
        required: true
        
    }

}, {timestamps : true});

module.exports = mongoose.model("Request", RequestSchema);