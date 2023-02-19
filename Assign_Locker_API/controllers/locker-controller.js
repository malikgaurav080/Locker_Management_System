const locker = require('../models/locker');


//Only for Admin
function GetAllLockerDetails(req, res) {
    locker.find({}, (err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);
        }
    });
}


//Only for User
function GetUserLockerDetails(req, res) {
    locker.find({userId : req.userId}, (err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);
        }
    });
}




//Only for Admin
function GetLockerDetailsByLockerId(req, res) { 
    locker.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);
        }
    });
}

//Only for Admin
function GetLockerDetailsByUserId(req, res) { 
    locker.find({userId: req.params.userId}, (err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);
        }
    });
}

//Only for Admin
function GetLockerDetailsByLockerNumber(req, res) { 
    locker.find({LockerNumber: req.params.LockerNumber}, (err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);

        }
    });
}



//Only for Admin
function GetLockerByNameAndEmail(req, res) {
    locker.find({$and: [{FullName : req.query.FullName}, {Email : req.query.Email}]}, (err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);
        }
    });
}




//Only for Admin
function UpdateLocker(req, res) {
    locker.findById(req.params.id, (err, docs) => {
        if (!err) {
            if (docs == null) {
                res.status(404).send({ message: `Locker with specified id: ${req.params.id} does not exists` });
            } else {
                locker.updateOne({ id: req.params.id }, {
                    FullName: req.body.FullName,
                    Email: req.body.Email,
                    MobileNumber : req.body.MobileNumber,
                    CompleteAddress: req.body.CompleteAddress,
                    Occupation: req.body.Occupation,
                    LockerSize: req.body.LockerSize,
                    Instructions: req.body.Instructions,                    
                    ValuableDetails : req.body.ValuableDetails,
                    Status : req.body.Status
                }, (err, docs) => {
                    if (!err) {
                        res.status(200).send({ message: 'Locker Updated Successfully' });
                    } else {
                        throw err;
                    }
                });
            }
        } else {
            res.send(err);
        }
    });
}




module.exports = { GetAllLockerDetails, GetUserLockerDetails, GetLockerDetailsByLockerId,
                    GetLockerDetailsByLockerNumber, GetLockerDetailsByUserId,
                    GetLockerByNameAndEmail, UpdateLocker }