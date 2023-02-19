const db = require('../db/index');

const GetLockerDetails = async (req, res) => {
    try {
      const results = await db.query("SELECT * FROM lockertype");
      return res.json(results.rows);
    } catch (err) {
      throw err;
    }
  };

const AddLockerDetails =   async (req, res) => {
    try {
      const result = await db.query(
        "INSERT INTO lockertype ( lockerid, sizeoflocker, priceoflocker ) VALUES ($1,$2,$3) RETURNING *",
        [req.body.lockerid, req.body.sizeoflocker, req.body.priceoflocker]
      );
      return res.json(result.rows[0]);
    } catch (err) {
        throw err;
    }
  };


async function UpdateLockerDetails(req, res) {
  try {
    const result = await db.query(
      "UPDATE lockertype SET sizeoflocker=$1, priceoflocker=$2 WHERE lockerid=$3 RETURNING *",
      [req.body.sizeoflocker, req.body.priceoflocker, req.params.lockerid]
      
    );
    return res.json(result.rows[0]);
  } catch (err) {
    throw err;
  }
};


async function UpdateAssignedByOne(req, res) {
  try {
    const result = await db.query(
      "UPDATE lockertype set assigned=assigned+1 WHERE lockerid=$1 RETURNING *",
      [req.params.lockerid]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    throw err;
  }
};

async function UpdateAssignedByOneM(req, res) {
  try {
    const result = await db.query(
      "UPDATE lockertype set assigned=assigned-1 WHERE lockerid=$1 RETURNING *",
      [req.params.lockerid]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    throw err;
  }
};

async function DeleteLocker(req, res) {
  try {
    const result = await db.query("DELETE FROM lockertype WHERE lockerid=$1", [
      req.params.lockerid
    ]);
    return res.json({ message: "Deleted" });
  } catch (err) {
    throw err;
  }
};


        
module.exports = { GetLockerDetails, AddLockerDetails, UpdateLockerDetails,
                   DeleteLocker, UpdateAssignedByOne, UpdateAssignedByOneM }
