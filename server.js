const express = require('express');
const bodyParser = require("body-parser");
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = 5000;
const authRouter = require('./routes/authRoute');

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user",authRouter);

app.listen(PORT, () => {
    console.log(`Server is running  at PORT http://localhost:${PORT}`);
  });