router
  .route("/:courseID/chart/:chartID")
  .put(bodyParser.json(), authenticateJWT, async (request, response) => {
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

      const updatedChart = {};

      updatedChart.reasonOfPlay =
        request.body.reasonOfPlay !== undefined
          ? request.body.reasonOfPlay
          : chart.reasonOfPlay;

      await Chart.findByIdAndUpdate(
        { _id: request.params.chartID },
        updatedChart
      );
      return response.status(200).json(updatedChart);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
