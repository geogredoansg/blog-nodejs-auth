const User = require("../models/User.model");

exports.getAllUsers =  async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Something went wrong."})
  }
}