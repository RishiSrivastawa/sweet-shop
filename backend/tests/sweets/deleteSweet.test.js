require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const Sweet = require("../../src/models/Sweet");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");

describe("DELETE /api/sweets/:id", () => {
  let token;
  let sweetId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await User.create({
      email: "admin_delete@test.com",
      password: "hashed",
      role: "ADMIN",
    });

    token = jwt.sign(
      { userId: admin._id },
      process.env.JWT_SECRET
    );

    const sweet = await Sweet.create({
      name: "Peda",
      category: "Indian",
      price: 25,
      quantity: 5,
    });

    sweetId = sweet._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should allow admin to delete a sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    const deletedSweet = await Sweet.findById(sweetId);
    expect(deletedSweet).toBeNull();
  });
});
