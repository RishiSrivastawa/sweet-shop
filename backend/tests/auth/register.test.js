require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/models/User");

describe("POST /api/auth/register", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  beforeEach(async () => {
  await User.deleteMany({});
});
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "testuser@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });
  it("should not allow duplicate email registration", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "duplicate@example.com",
      password: "password123",
    });

  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "duplicate@example.com",
      password: "password123",
    });

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("error");
});


});
