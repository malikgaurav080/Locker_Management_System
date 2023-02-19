const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/lockerRoute');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGI_URL)
mongoose.connection.once('open', (err) => {
    if (!err) {
        console.log('Connected to DB');
    } else {
        throw err;
    }
})
app.use(express.json());

app.use('/locker', router);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)  
})