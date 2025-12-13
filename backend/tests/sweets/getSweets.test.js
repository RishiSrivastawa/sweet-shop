require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/models/User");
const Sweet = require("../../src/models/Sweet");
const jwt = require("jsonwebtoken");

describe("GET /api/sweets", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.create({
      email: "sweetuser@test.com",
      password: "hashedpassword",
    });

    token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return list of sweets for authenticated user", async () => {
    await Sweet.create({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 5,
    });

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
