const request = require("supertest");
const app = require("../../src/app");

describe("Protected route", () => {
  it("should block access without token", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
