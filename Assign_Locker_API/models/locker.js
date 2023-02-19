const mongoose = require('mongoose');

let LockerSchema = mongoose.Schema({
    // userId : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    FullName: String,
    Email: String,
    MobileNumber : Number,
    CompleteAddress: String,
    Occupation: String,
    LockerSize: String,
    LockerNumber: Number,
    KeyNumber : String,
    Instructions: String,
    NomineeName: String,
    Relationwithnominee: String,
    ValuableDetails : String,
    // IDcard: String,
    // IDproof: String,
    // Photo: String,
    Status : String,
    // LockerAssigndate: Date.now()

}, {timestamps : true});

module.exports = mongoose.model('Locker-Assigned', LockerSchema)

