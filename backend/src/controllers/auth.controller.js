const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUser };

const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ token });
};

module.exports = {
  registerUser,
  loginUser,
};
