const express = require("express");
const { signup, signin, GenerateRequest } = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const adminRouter = express.Router();

adminRouter.post("/signup", auth, signup);
adminRouter.post("/signin", signin);
adminRouter.post("/requests", GenerateRequest);

module.exports = adminRouter;