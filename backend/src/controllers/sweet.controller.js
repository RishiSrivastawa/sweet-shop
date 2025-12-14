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
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const sweets = await Sweet.find(filter);
  return res.status(200).json(sweets);
};

const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet || sweet.quantity === 0) {
    return res.status(400).json({ error: "Sweet not available" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  return res.status(200).json(sweet);
};

const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    return res.status(200).json(sweet);
  } catch (err) {
    return res.status(400).json({ error: "Invalid data" });
  }
};
const deleteSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  await sweet.deleteOne();
  return res.status(200).json({ message: "Sweet deleted successfully" });
};

const restockSweet = async (req, res) => {
  const { amount } = req.body;

  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  sweet.quantity += amount;
  await sweet.save();

  return res.status(200).json(sweet);
};


module.exports = { addSweet, getSweets, purchaseSweet, updateSweet, deleteSweet, restockSweet };
