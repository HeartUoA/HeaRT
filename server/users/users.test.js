import MongodbMemoryServer from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import User from "./user.model";

describe("/api/users tests", () => {
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
    await User.remove({});
  });

  it("should be able to create a new user", async () => {
    const dateNow = new Date();

    const postResponse = await request(app).post("/api/users").send({
      name: "John Doe",
      passwordHash: "aMoreSecureHashThanThisPlease",
      email: "john@doe.com",
      position: "Course Cordinator",
      department: "Engineering",
      institution: "The University Of Auckland",
      createdAt: dateNow,
      username: "jdoe",
    });
    expect(postResponse.status).toBe(200);
  });

  it("should be able to authenticate a user", async () => {
    const dateNow = new Date();

    const postResponse = await request(app).post("/api/users").send({
      name: "John Doe",
      passwordHash: "aMoreSecureHashThanThisPlease",
      email: "john@doe.com",
      position: "Course Cordinator",
      department: "Engineering",
      institution: "The University Of Auckland",
      createdAt: dateNow,
      username: "jdoe",
    });
    expect(postResponse.status).toBe(200);

    const authResponse = await request(app)
      .post("/api/users/authenticate/jdoe")
      .send({
        passwordHash: "aMoreSecureHashThanThisPlease",
      });
    expect(authResponse.status).toBe(200);
    expect(authResponse.body.username).toEqual("jdoe");
  });

  it("should fail to authenticate a user if an incorrect password is provided", async () => {
    const dateNow = new Date();

    const postResponse = await request(app).post("/api/users").send({
      name: "John Doe",
      passwordHash: "aMoreSecureHashThanThisPlease",
      email: "john@doe.com",
      position: "Course Cordinator",
      department: "Engineering",
      institution: "The University Of Auckland",
      createdAt: dateNow,
      username: "jdoe",
    });
    expect(postResponse.status).toBe(200);

    const authResponse = await request(app)
      .post("/api/users/authenticate/jdoe")
      .send({
        passwordHash: "WrongPasswordHash",
      });
    expect(authResponse.status).toBe(403);
    expect(authResponse.body.username).toBeUndefined();
  });

  it("should fail to authenticate a user if they don't exist", async () => {
    const authResponse = await request(app)
      .post("/api/users/authenticate/jdoe")
      .send({
        passwordHash: "WrongPasswordHash",
      });
    expect(authResponse.status).toBe(403);
    expect(authResponse.body.username).toBeUndefined();
  });
});
