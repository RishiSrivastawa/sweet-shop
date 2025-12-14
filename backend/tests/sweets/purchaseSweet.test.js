const request = require("supertest");
const app = require("../../src/app");
const Sweet = require("../../src/models/Sweet");
const { getAuthToken } = require("../helpers/auth.helper");

beforeEach(async () => {
  await Sweet.deleteMany({});
});

it("should decrease quantity when sweet is purchased", async () => {
  const token = await getAuthToken();

  const sweet = await Sweet.create({
    name: "Barfi",
    category: "Indian",
    price: 20,
    quantity: 5,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);

  const updatedSweet = await Sweet.findById(sweet._id);
  expect(updatedSweet.quantity).toBe(4);
});
