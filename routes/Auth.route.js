const express = require('express');
const router = express.Router();

const authCtrl = require("../controllers/Auth.controller");

router.post("/sign_up", authCtrl.signUp);
router.post("/login", authCtrl.login);
router.post("/verify_token", authCtrl.verifyToken);

module.exports = router;