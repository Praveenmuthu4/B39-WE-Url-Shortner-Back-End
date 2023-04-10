const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors')
const mongoose = require("mongoose");

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server connected ${PORT}`);
});
