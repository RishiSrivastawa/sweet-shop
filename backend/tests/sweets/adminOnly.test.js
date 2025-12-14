require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/models/User");
const { getAuthToken } = require("../helpers/auth.helper");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

it("should block non-admin user from adding sweet", async () => {
  const token = await getAuthToken(); // normal user

  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Jalebi",
      category: "Indian",
      price: 10,
      quantity: 5,
    });

  expect(res.statusCode).toBe(403);
  expect(res.body).toHaveProperty("error");
});
