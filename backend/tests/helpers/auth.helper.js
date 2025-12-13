const request = require("supertest");
const app = require("../../src/app");

const getAuthToken = async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "helperuser@example.com",
      password: "password123",
    })
    .catch(() => {}); // ignore duplicate user error

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "helperuser@example.com",
      password: "password123",
    });

  return res.body.token;
};

module.exports = { getAuthToken };
