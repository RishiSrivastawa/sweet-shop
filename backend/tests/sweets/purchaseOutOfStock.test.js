const request = require("supertest");
const app = require("../../src/app");
const Sweet = require("../../src/models/Sweet");
const { getAuthToken } = require("../helpers/auth.helper");

beforeEach(async () => {
  await Sweet.deleteMany({});
});

it("should not allow purchase when sweet is out of stock", async () => {
  const token = await getAuthToken();

  const sweet = await Sweet.create({
    name: "Rasgulla",
    category: "Indian",
    price: 15,
    quantity: 0,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("error");
});
