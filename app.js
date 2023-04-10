const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors')
dotenv.config();

const connection = require("./db");
connection.once("open", () => console.log("DB Connected"));
connection.on("error", () => console.log("Error"));

app.use(
  express.json({
    extended: false,
  })
);
app.use(cors());

app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
