import bodyParser from "body-parser";
import { Router } from "express";
import Course from "./course.model";
import Chart from "../chart/chart.model";
import Dimension from "../dimension/dimension.model";
import authenticateJWT from "../middleware/Authentication";
import { defaultDimensionData } from "../dimension/defaultDimensions";

const router = Router();

router.route("/:courseID").get(authenticateJWT, async (request, response) => {
  try {
    const courses = await Course.find({ _id: request.params.courseID });
    if (courses[0].createdByUserID !== request.user.userID) {
      return response
        .status(403)
        .json("You do not have permissions to access this course");
    }
    return response.status(200).json(courses);
  } catch (error) {
    return response.status(400).send(error);
  }
});

router
  .route("/")
  .post(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const course = new Course(request.body);
      course.createdByUserID = request.user.userID;
      await course.save();
      return response.status(200).send(course);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router
  .route("/:courseID/chart")
  .post(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const courses = await Course.find({ _id: request.params.courseID });
      if (courses[0].createdByUserID !== request.user.userID) {
        return response
          .status(403)
          .json(
            "You do not have permissions to create a chart for this course"
          );
      }
      const chart = new Chart();
      chart.courseID = request.params.courseID;
      chart.dateCreated = Date.now();
      await chart.save();

      let dimensions = [];
      // Create the default dimensions and link them to the chart
      let dimensionData;
      for (dimensionData in defaultDimensionData) {
        console.log(defaultDimensionData[dimensionData]);
        const dimension = new Dimension(defaultDimensionData[dimensionData]);
        dimension.chartID = chart._id;
        await dimension.save();
        dimensions.push(dimension);
      }

      const reducedArray = dimensions.reduce((a, c) => ({ ...a, ...c }), {});

      response.status(200).json({
        chartID: chart._id,
        dateCreated: chart.dateCreated,
        dimensions: dimensions,
      });
    } catch (error) {
      return response.status(400).send(error);
    }
  });

export default router;
