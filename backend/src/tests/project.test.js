const request = require("supertest");
const app = require("../src/app");

describe("Project API", () => {
  it("should create a project", async () => {
    const res = await request(app)
      .post("/api/v1/projects")
      .send({
        name: "Test Project",
        description: "Demo"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Project");
  });
});
