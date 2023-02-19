const express = require("express");
const { GetLockerDetails, AddLockerDetails, UpdateLockerDetails, DeleteLocker,
        UpdateAssignedByOne, UpdateAssignedByOneM } = require('../controller/lockerController')
const auth = require('../middleware/AdminAuth')
const router = express.Router();


router.get('/', auth, GetLockerDetails);
router.post('/', auth, AddLockerDetails);
router.put('/:lockerid', auth, UpdateLockerDetails);

router.put('/auto-inc/:lockerid', UpdateAssignedByOne);
router.put('/auto-dec/:lockerid', UpdateAssignedByOneM);

router.delete('/:lockerid', auth, DeleteLocker);


module.exports = router;