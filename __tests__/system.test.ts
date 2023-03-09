import { server } from "./config";

describe("[URL NOT FOUND]", function () {
  test("it should return url not found", async function () {
    const response = await server.post(`/url/notfound`);
    expect(response.status).toEqual(404);
  });
});
