const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./database");


const port = 4001;

// we will create these todoRoutes in the future
const authRoutes = require("./routes/Auth.route");
const userRoutes = require("./routes/User.route");

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`
    ==============================================
    =                                            =
    =               Auth Module                  =                      
    =   Listening to http://localhost:${port}    =
    =                                            =
    ==============================================
  `)
});
