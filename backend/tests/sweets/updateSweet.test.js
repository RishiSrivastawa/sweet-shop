require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const Sweet = require("../../src/models/Sweet");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");

describe("PUT /api/sweets/:id", () => {
  let token;
  let sweetId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await User.create({
      email: "admin_update@test.com",
      password: "hashed",
      role: "ADMIN",
    });

    token = jwt.sign(
      { userId: admin._id },
      process.env.JWT_SECRET
    );

    const sweet = await Sweet.create({
      name: "Kaju Katli",
      category: "Indian",
      price: 30,
      quantity: 10,
    });

    sweetId = sweet._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should allow admin to update sweet details", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 40,
        quantity: 15,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(40);
    expect(res.body.quantity).toBe(15);
  });
});
