const express = require('express');
const { GetAllLockerDetails, GetUserLockerDetails, GetLockerByNameAndEmail, GetLockerDetailsByUserId,
        GetLockerDetailsByLockerId,GetLockerDetailsByLockerNumber,
        UpdateLocker } = require('../controllers/locker-controller');

const { AddNewLocker, DeleteLocker } = require('../controllers//fetch-Controller');
const router = express.Router();



const { userauth } = require("../middlewares/UserAuth");
const {adminauth} = require("../middlewares/AdminAuth");


// Only for Admin
router.get('/details', adminauth, GetAllLockerDetails);
router.get('/details/:id', adminauth, GetLockerDetailsByLockerId);
router.get('/details-by-userId/:userId', adminauth, GetLockerDetailsByUserId);
router.get('/details-by-LockerNumber/:LockerNumber', adminauth, GetLockerDetailsByLockerNumber);
router.get('/details-by-nameAndEmail/', adminauth, GetLockerByNameAndEmail);


//For User
router.get('/User-details', userauth, GetUserLockerDetails);


//Only for Admin
router.put('/update-locker/:id', adminauth, UpdateLocker);

// Fetch API for Admin
router.post('/add-locker', adminauth, AddNewLocker);
router.delete('/delete-locker/:id', adminauth, DeleteLocker);

module.exports = router;


