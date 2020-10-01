import MongodbMemoryServer, { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import Chart from "./chart.model";

describe("/api/chart tests", () => {
  const mongod = new MongoMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await Chart.remove({});
  });

  it("should be able to create a new chart", async () => {
    const dateNow = new Date();

    const postResponse = await request(app).post("/api/chart").send({});
  });
});
