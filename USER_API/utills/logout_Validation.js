const jwtModel = require('../models/jwt')

const logout_validation = (token) =>{
    try {
        token = token.split(" ")[1];
        jwtModel.find({ jwt : token}, (err, docs) => {
            if(!err){
                if(docs[0].flag==1){
                    console.log(docs[0].flag)
                    return "Token Invalid User has been Logged-Out"
                } 
            } 
        });
    } catch (err) {
        return err
    }
}

module.exports = { logout_validation };