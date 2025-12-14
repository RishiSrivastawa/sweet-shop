require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const Sweet = require("../../src/models/Sweet");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");

describe("POST /api/sweets/:id/restock", () => {
  let token;
  let sweetId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await User.create({
      email: "admin_restock@test.com",
      password: "hashed",
      role: "ADMIN",
    });

    token = jwt.sign(
      { userId: admin._id },
      process.env.JWT_SECRET
    );

    const sweet = await Sweet.create({
      name: "Halwa",
      category: "Indian",
      price: 25,
      quantity: 5,
    });

    sweetId = sweet._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should allow admin to restock sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(10);
  });
});
