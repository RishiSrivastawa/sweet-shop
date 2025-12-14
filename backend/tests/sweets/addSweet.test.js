require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const Sweet = require("../../src/models/Sweet");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({});

  const adminUser = await User.create({
    email: "admin@test.com",
    password: "hashed",
    role: "ADMIN",
  });

  adminToken = jwt.sign(
    { userId: adminUser._id },
    process.env.JWT_SECRET
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

it("should allow admin user to add a sweet", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Jalebi",
      category: "Indian",
      price: 15,
      quantity: 10,
    });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("_id");
  expect(res.body.name).toBe("Jalebi");
});
