import express from "express";
import { resolve } from "path";
import courseController from "./course/course.controller";
import usersController from "./users/users.controller";
import dimensionsController from "./dimension/dimensions.controller";
import chartController from "./chart/chart.controller";

// Create the express application
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Assign controllers to routes
app.use("/api/course", courseController);
app.use("/api/users", usersController);
app.use("/api/dimensions", dimensionsController);
app.use("/api/chart", chartController);

// Declare the path to frontend's static assets
app.use(express.static(resolve("..", "build")));

// Intercept requests to return the frontend's static entry point
app.get("*", (_, response) => {
  response.sendFile(resolve("..", "build", "index.html"));
});

export default app;
