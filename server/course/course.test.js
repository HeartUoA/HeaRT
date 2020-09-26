import MongodbMemoryServer from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import Course from "./course.model";
import User from "../users/user.model";

describe("/api/course tests", () => {
  const mongod = new MongodbMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });

    const postResponse = await request(app).post("/api/users").send({
      name: "John Doe",
      passwordHash: "aMoreSecureHashThanThisPlease",
      email: "john@doe.com",
      position: "Course Cordinator",
      department: "Engineering",
      institution: "The University Of Auckland",
      username: "jdoe",
    });
    expect(postResponse.status).toBe(200);

    const authResponse = await request(app)
      .post("/api/users/authenticate/jdoe")
      .send({
        passwordHash: "aMoreSecureHashThanThisPlease",
      });
    expect(authResponse.status).toBe(200);
    expect(authResponse.body.accessToken).toBeDefined();
  });

  afterAll(async () => {
    await User.remove({});
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await Course.remove({});
  });

  it("should post and get courses", async () => {
    const authResponse = await request(app)
      .post("/api/users/authenticate/jdoe")
      .send({
        passwordHash: "aMoreSecureHashThanThisPlease",
      });
    expect(authResponse.status).toBe(200);

    const postResponse = await request(app)
      .post("/api/course")
      .set("Authorization", "Bearer " + authResponse.body.accessToken)
      .send({
        name: "SOFTENG 700",
        cohortSize: 200,
        role: "Course Cordinator",
        ageOfCourse: 5,
      });

    expect(postResponse.status).toBe(200);
    expect(postResponse.body).toBeDefined();

    const getResponse = await request(app)
      .get("/api/course/" + postResponse.body._id)
      .set("Authorization", "Bearer " + authResponse.body.accessToken);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([
      expect.objectContaining({
        name: "SOFTENG 700",
        cohortSize: 200,
        role: "Course Cordinator",
        ageOfCourse: 5,
      }),
    ]);
    expect(getResponse.body[0]).toHaveProperty("_id");
  });
});
