import bodyParser from "body-parser";
import { Router } from "express";
import Dimension from "./dimension.model";
import Chart from "../chart/chart.model";
import Course from "../course/course.model";
import authenticateJWT from "../middleware/Authentication";

const router = Router();

router
  .route("/:dimensionID")
  .get(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const dimension = await Dimension.findOne({
        _id: request.params.dimensionID,
      });
      if (!dimension || dimension.length === 0) {
        return response.status(404).send();
      }

      const referenceChart = await Chart.findOne({ _id: dimension.chartID });
      if (!referenceChart || referenceChart.length === 0) {
        return response.status(404).send("No course exists for this dimension");
      }
      const course = await Course.findOne({ _id: referenceChart.courseID });
      if (course.createdByUserID !== request.user.userID) {
        return response.status(403).send();
      }

      return response.status(200).json(dimension);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router
  .route("/:dimensionID")
  .put(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const dimension = await Dimension.findOne({
        _id: request.params.dimensionID,
      });

      if (!dimension || dimension.length === 0) {
        return response.status(404).send();
      }

      const updatedDimension = {};

      updatedDimension.score =
        request.body.score !== undefined ? request.body.score : dimension.score;
      updatedDimension.definition =
        request.body.definition !== undefined
          ? request.body.definition
          : dimension.definition;
      updatedDimension.leftCardStatement =
        request.body.leftCardStatement !== undefined
          ? request.body.leftCardStatement
          : dimension.leftCardStatement;
      updatedDimension.rightCardStatement =
        request.body.rightCardStatement !== undefined
          ? request.body.rightCardStatement
          : dimension.rightCardStatement;
      updatedDimension.note =
        request.body.note !== undefined ? request.body.note : dimension.note;

      const referenceChart = await Chart.findOne({ _id: dimension.chartID });
      if (!referenceChart || referenceChart.length === 0) {
        return response.status(404).send("No course exists for this dimension");
      }
      const course = await Course.findOne({ _id: referenceChart.courseID });
      if (course.createdByUserID !== request.user.userID) {
        return response.status(403).send();
      }

      await Dimension.findByIdAndUpdate(
        { _id: request.params.dimensionID },
        updatedDimension
      );
      return response.status(200).json(updatedDimension);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router
  .route("/forchart/:chartID")
  .get(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const referenceChart = await Chart.findOne({
        _id: request.params.chartID,
      });
      if (!referenceChart || referenceChart.length === 0) {
        return response.status(404).send("No course exists with that ID");
      }
      const course = await Course.findOne({ _id: referenceChart.courseID });
      if (course.createdByUserID !== request.user.userID) {
        return response.status(403).send();
      }
      const dimensions = await Dimension.find({
        chartID: request.params.chartID,
      });
      if (!dimensions || dimensions.length === 0) {
        return response.status(404).send();
      }
      return response.status(200).json(dimensions);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

export default router;
