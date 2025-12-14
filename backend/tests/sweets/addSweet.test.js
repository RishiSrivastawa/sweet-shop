require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const Sweet = require("../../src/models/Sweet");
const { getAuthToken } = require("../helpers/auth.helper");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
});

it("should allow authenticated user to add a sweet", async () => {
  const token = await getAuthToken();

  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
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
