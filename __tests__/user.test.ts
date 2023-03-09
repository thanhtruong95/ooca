import { server } from "./config";

describe("[USER]", function () {
  test("it should return login successful", async function () {
    const response = await server.post(`/user/login`).send({
      username: "guest",
      password: "guest",
    });
    expect(response.status).toEqual(200);
  });
  test("it should return login failed", async function () {
    const response = await server.post(`/user/login`).send({
      username: "guest",
      password: "wrong password",
    });
    expect(response.status).toEqual(404);
  });
});
