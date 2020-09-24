import MongodbMemoryServer from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import Course from "./course.model";

describe("/api/course tests", () => {
  const mongod = new MongodbMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await Course.remove({});
  });

  it("should post and get courses", async () => {
    const dateNow = new Date();

    const postResponse = await request(app).post("/api/course").send({
      name: "SOFTENG 700",
      date: dateNow,
      cohortSize: 200,
      role: "Course Cordinator",
      ageOfCourse: 5,
      createdByUserID: "testID",
    });
    expect(postResponse.status).toBe(200);
    expect(postResponse.body).toBeDefined();

    const getResponse = await request(app).get(
      "/api/course/" + postResponse.body._id
    );
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([
      expect.objectContaining({
        name: "SOFTENG 700",
        cohortSize: 200,
        role: "Course Cordinator",
        ageOfCourse: 5,
        createdByUserID: "testID",
      }),
    ]);
    // Need to check date seperately after casting to a Date object
    expect(new Date(getResponse.body[0].date)).toEqual(dateNow);
    expect(getResponse.body[0]).toHaveProperty("_id");
  });
});
