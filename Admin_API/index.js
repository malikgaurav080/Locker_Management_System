const express = require("express");
const app = express();
const adminRouter = require("./routes/adminRoutes"); 
const dotenv = require("dotenv");
// const cors = require("cors");
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());

// app.use(cors());

app.use("/admin", adminRouter);


app.get("/", (req, res) =>{
    res.send("Tests API From Gaurav");
});


const port = process.env.PORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URL)
// mongoose.connect(process.env.Cluster_URL)
.then(()=>{
    app.listen(port, ()=>{
        console.log("Server started on port no. " + port);
    });
})
.catch((error)=>{
    console.log(error);
})


