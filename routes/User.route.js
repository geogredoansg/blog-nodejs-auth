const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/User.controller")
const authToken = require("../middlewares/authToken")

router.get("/users", [authToken.verifyToken], userCtrl.getAllUsers)

module.exports = router;