const Sweet = require("../models/Sweet");

const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    return res.status(201).json(sweet);
  } catch (err) {
    return res.status(400).json({ error: "Invalid sweet data" });
  }
};

const getSweets = async (req, res) => {
  const sweets = await Sweet.find({});
  return res.status(200).json(sweets);
};

module.exports = { addSweet, getSweets };
