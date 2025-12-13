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

it("should search sweets by category", async () => {
  const token = await getAuthToken();

  await Sweet.create({
    name: "Ladoo",
    category: "Indian",
    price: 10,
    quantity: 5,
  });

  await Sweet.create({
    name: "Brownie",
    category: "Western",
    price: 20,
    quantity: 5,
  });

  const res = await request(app)
    .get("/api/sweets?category=Indian")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].category).toBe("Indian");
});
