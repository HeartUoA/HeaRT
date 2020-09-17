import bodyParser from "body-parser";
import { Router } from "express";
import Cards from "./cards.model";

const router = Router();

router.route("/").post(bodyParser.json(), async (request, response) => {
  try {
    const cards = new Cards(request.body);
    await cards.save();
    return response.status(200).json("Card created!");
  } catch (error) {
    return response.status(400).send(error);
  }
});

router.route("/").get(async (_, response) => {
  const cards = await Cards.find();
  return response.status(200).json(cards);
});

export default router;
