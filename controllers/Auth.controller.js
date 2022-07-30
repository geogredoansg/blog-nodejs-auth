const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userObj = new User({
      email,
      password: await User.encryptPassword(password),
      firstName,
      lastName
    })
    const savedUser = await userObj.save();
    const token = jwt.sign({ id: savedUser._id}, 'secretKey', { expiresIn: 86400 })
    res.status(200).json({ data: savedUser, token})
  } catch (error) {
    res.status(400).json({error: "Something went wrong." })
  }
}

exports.login = async(req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(400).json({
      error: "Email or Password is invalid."
    })
  }

  const matchPassword = await User.comparePassword(req.body.password, user.password)
  console.log(matchPassword)
  if (!matchPassword) {
    res.status(400).json({
      error: "Email or Password is invalid."
    })
  }

  const token = jwt.sign({ id: user._id}, 'secretKey', { expiresIn: 86400})
  return res.json({
    data: user,
    token: token
  })
}

exports.verifyToken = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(403).json({
        error: "No token provided."
      })
    }

    const decoded = jwt.verify(token, 'secretKey');
    
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0})
    if (!user) {
      return res.status(400).json({
        error: "No user found."
      })
    }
    return res.json({
      status: 200,
      message: "Authorized",
      user
    })
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized."
    })
  }
}