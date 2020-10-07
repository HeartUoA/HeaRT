import bodyParser from "body-parser";
import { Router } from "express";
import Chart from "./chart.model";
import authenticateJWT from "../middleware/Authentication";

const router = Router();

router
  .route("/:chartID")
  .put(bodyParser.json(), authenticateJWT, async (request, response) => {
    try {
      const chart = await Chart.findOne({
        _id: request.params.chartID,
      });
      if (!chart || chart.length === 0) {
        return response.status(404).send();
      }

      const updatedField = {};
      updatedField.isComplete = response.body.isComplete;

      await Chart.findByIdAndUpdate(
        { _id: request.params.chartID },
        updatedField
      );

      return response.status(200).json(updatedField);
    } catch (error) {
      return response.status(400).send(error);
    }
  });

router.route("/:chartID").get(authenticateJWT, async (request, response) => {
  try {
    const chart = await Chart.findOne({
      _id: request.params.chartID,
    });
    if (!chart || chart.length === 0) {
      return response.status(404).send();
    }
    return response.status(200).json(chart);
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default router;
