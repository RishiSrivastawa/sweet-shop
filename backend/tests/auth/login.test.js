require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/models/User");
const bcrypt = require("bcrypt");

describe("POST /api/auth/login", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async () => {
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({
      email: "loginuser@example.com",
      password: hashedPassword,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should login user and return JWT token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "loginuser@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
