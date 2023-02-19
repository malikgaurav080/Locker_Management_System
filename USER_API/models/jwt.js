const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const jwtSchema = mongoose.Schema({
    jwt : {
        type : String
    },
    flag : {
        type : Number,
        default: 0
    }
}, {timestamps : true});
module.exports = mongoose.model("jwt", jwtSchema);