import { server } from "./config";

import jwt from "jsonwebtoken";

const userToken = jwt.sign(
  {
    id: "97e490db-f099-4a12-9fd0-f5aaa951f575",
    firstName: "alex",
    lastName: "truong",
    role: "user",
  },
  process.env.NODE_APP_JWT_KEY,
  { expiresIn: 30 * 60 }
);

describe("[STRESS]", function () {
  test("it should return stress by user", async function () {
    const response = await server.get(`/stress/anonymous`);
    expect(response.status).toEqual(200);
  });
  test("it should create stress", async function () {
    const response = await server
      .post(`/stress`)
      .set("Authorization", userToken)
      .send({
        stressLevelId: 1,
      });
    expect(response.status).toEqual(200);
  });

  test("it should create stress failed with authentication", async function () {
    const response = await server.post(`/stress`).send({
      stressLevelId: 1,
    });
    expect(response.status).toEqual(401);
  });
  test("it should create stress with anonymous user", async function () {
    const response = await server.post(`/stress/anonymous`).send({
      stressLevelId: 1,
      anonymousId: "anonymousId",
    });
    expect(response.status).toEqual(200);
  });
  it("should upload an image and return a 200 status code", async () => {
    const response = await server
      .post("/stress/c025ccb8-6c1c-464d-a07e-b677b41595e7/upload")
      .attach("image", "./__tests__/logo-avatar.png");
    expect(response.status).toBe(200);
  });
  it("should upload an image failed and return a 404 status code", async () => {
    const response = await server
      .post("/stress/c025ccb8-6c1c-464d-a07e-b677b41595e2/upload")
      .attach("image", "./__tests__/logo-avatar.png");
    expect(response.status).toBe(404);
  });
});
