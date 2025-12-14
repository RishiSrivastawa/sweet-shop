const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};

module.exports = adminMiddleware;
