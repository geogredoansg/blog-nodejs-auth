const mongoose = require("mongoose");
require('dotenv').config();

// DB connection
var connection = mongoose.connect(
                            process.env.DB_URL, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                          })
                          .then(() => {
                            console.log("CONNECTED TO DATABASE");
                          });

module.exports = connection;