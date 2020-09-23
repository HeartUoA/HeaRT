import MongodbMemoryServer from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import Course from "./cards.model";

describe("/api/cards tests", () => {
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

  it("should post and get cards", async () => {
    const postResponse = await request(app).post("/api/cards").send({
      Dimension: "1",
      Statement: "Learners can only do learning tasks in one way.",
      Position: "0",
    });
    expect(postResponse.status).toBe(200);
    expect(postResponse.body).toBe("Card created!");

    const getResponse = await request(app).get("/api/cards");
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([
      expect.objectContaining({
        Dimension: 1,
        Statement: "Learners can only do learning tasks in one way.",
        Position: 0,
      }),
    ]);
    expect(getResponse.body[0]).toHaveProperty("_id");
  });
});
