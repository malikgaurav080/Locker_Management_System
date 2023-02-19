const express = require("express");
const usersRoutes = require("./routes/lockerType");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use("/lockerType", usersRoutes);


const port = process.env.PORT


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});