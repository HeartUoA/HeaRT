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

router.route("/").get(authenticateJWT, async (request, response) => {
  const courses = await Course.find(
    { createdByUserID: request.user.userID },
    function (err, result) {
      if (err) {
        return response.status(400).send(error);
      }
      if (!result || result.length === 0) {
        return response.status(404).send("No courses found");
      }
    }
  );
  return response.status(200).json(courses);
});

router
  .route("/")
  .post(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const course = new Course(request.body);
      course.createdByUserID = request.user.userID;
      course.reasonOfPlay = request.params.reasonOfPlay;
      course.createdAt = Date.now();
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
      chart.reasonOfPlay = request.params.reasonOfPlay;
      chart.createdAt = Date.now();
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

      response.status(200).json({
        chartID: chart._id,
        createdAt: chart.createdAt,
        reasonOfPlay: chart.reasonOfPlay,
        dimensions: dimensions,
      });
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router
  .route("/:courseID/chart")
  .get(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const charts = await Chart.find({ courseID: request.params.courseID });
      if (!charts || charts.length === 0) {
        return response.status(404).send("No charts found");
      }
      const referenceCourse = await Course.find({ _id: charts[0].courseID });
      if (referenceCourse[0].createdByUserID !== request.user.userID) {
        return response
          .status(403)
          .json("You do not have permissions to view charts for this course");
      }
      charts[charts.length] =
        "To get dimensions for any of these charts, access the /api/dimensions/forchart/{chartID} endpoint";
      response.status(200).json(charts);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router
  .route("/:courseID/chart/:chartID")
  .get(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const chart = await Chart.find({ _id: request.params.chartID }, function (
        err,
        result
      ) {
        if (!result || result.length === 0) {
          return response
            .status(404)
            .send(
              "No chart found. You can create one at /api/course/{courseID}/chart/"
            );
        }
        if (err) {
          return response.status(400).send(err);
        }
      });

      const referenceCourse = await Course.find({ _id: chart[0].courseID });
      if (referenceCourse[0].createdByUserID !== request.user.userID) {
        return response
          .status(403)
          .json("You do not have permissions to view charts for this course");
      }
      response.status(200).json(chart);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

export default router;
