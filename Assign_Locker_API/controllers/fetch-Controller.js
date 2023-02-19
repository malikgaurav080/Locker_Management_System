const locker = require('../models/locker');
const { v4: uuidv4 } = require('uuid');
const {small, smalld, medium, mediumd, large, larged, xlarge, xlarged} = require('..//fetch_api/fetch')

//if any error caught in fetch then only be used for consistency
// function DeleteLocker(req, res) {
//     locker.deleteOne({ id: req.params.id }, (err, docs) => {
//         if (!err) {
//             res.status(200).send({ message: 'Locker Deleted Successfully' });
//         } else {
//             throw err;
//         }
//     });
// }

//Only for Admin
async function AddNewLocker(req, res) {
    let newLocker = new locker({
        
        userId: req.body.userId,
        FullName: req.body.FullName,
        Email: req.body.Email,
        MobileNumber : req.body.MobileNumber,
        CompleteAddress: req.body.CompleteAddress,
        Occupation: req.body.Occupation,
        LockerSize: req.body.LockerSize,
        LockerNumber: req.body.LockerNumber,
        KeyNumber: uuidv4(),
        Instructions: req.body.Instructions,
        NomineeName: req.body.NomineeName,
        Relationwithnominee: req.body.Relationwithnominee,
        ValuableDetails : req.body.ValuableDetails,
        Status : req.body.Status
    });

        if(req.body.LockerSize=="Small" || req.body.LockerSize=="small"){         
            newLocker.save((err) => {
                if (!err) {
                    res.status(201).send({ message: 'Locker Added Successfully' });
                    small();
                } else {
                    throw err;
                }
            });      
        } else if(req.body.LockerSize=="Medium" || req.body.LockerSize=="medium"){
            newLocker.save((err) => {
                if (!err) {
                    res.status(201).send({ message: 'Locker Added Successfully' });
                    medium();
                } else {
                    throw err;
                }
            });
        } else if(req.body.LockerSize=="large" || req.body.LockerSize=="Large"){
            newLocker.save((err) => {
                if (!err) {
                    res.status(201).send({ message: 'Locker Added Successfully' });
                    const lid = newLocker.id;
                    large(lid);
                } else {
                    throw err;
                }
            });
        } else if(req.body.LockerSize=="X-large" || req.body.LockerSize=="X-Large"){
            newLocker.save((err) => {
                if (!err) {
                    res.status(201).send({ message: 'Locker Added Successfully' });
                    xlarge();
                } else {
                    throw err;
                }
            });
        } else{
            console.log("Please Type Correct Locker Name");
            res.status(404).send({ message: 'Please Type Correct Locker Name' });
        }

}



function DeleteLocker(req, res) {
    locker.findById(req.params.id, (err, docs) => {
        if (!err) {
            const size = docs.LockerSize;
            if(size=="Small" || size=="small"){  
                locker.deleteOne({ id: req.params.id }, (err, docs) => {
                    if (!err) {
                        res.status(200).send({ message: 'Locker Deleted Successfully' });
                        smalld();
                    } else {
                        throw err;
                    }
                });       
               
            } else if(size=="Medium" || size=="medium"){
                locker.deleteOne({ id: req.params.id }, (err, docs) => {
                    if (!err) {
                        res.status(200).send({ message: 'Locker Deleted Successfully' });
                        mediumd();
                    } else {
                        throw err;
                    }
                });
            
            } else if(size=="large" || size=="Large"){
                locker.deleteOne({ id: req.params.id }, (err, docs) => {
                    if (!err) {
                        res.status(200).send({ message: 'Locker Deleted Successfully' });
                        larged();
                    } else {
                        throw err;
                    }
                });
            
            } else if(size=="X-large" || size=="X-Large"){
                locker.deleteOne({ id: req.params.id }, (err, docs) => {
                    if (!err) {
                        res.status(200).send({ message: 'Locker Deleted Successfully' });
                        xlarged();
                    } else {
                        throw err;
                    }
                });
            
            } else{
                console.log("Locker Not Exist");
                res.status(404).send({ message: 'Locker Not Exist' });
            }
            
        } else {
            res.send(err);
        }
    });

}



module.exports = { AddNewLocker, DeleteLocker }