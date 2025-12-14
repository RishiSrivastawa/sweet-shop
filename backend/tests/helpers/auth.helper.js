const request = require("supertest");
const app = require("../../src/app");

const getAuthToken = async () => {
  const email = `user_${Date.now()}@test.com`;

  await request(app).post("/api/auth/register").send({
    email,
    password: "password123",
  });

  const res = await request(app).post("/api/auth/login").send({
    email,
    password: "password123",
  });

  return res.body.token;
};

module.exports = { getAuthToken };
