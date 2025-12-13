const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "User registered successfully",
  });
};

module.exports = { registerUser };
