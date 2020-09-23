import bodyParser from "body-parser";
import { Router } from "express";
import User from "./user.model";

const router = Router();

router.route("/").post(bodyParser.json(), async (request, response) => {
  try {
    const user = new User(request.body);
    await user.save();
    return response.status(200).json("User created!");
  } catch (error) {
    return response.status(400).send(error);
  }
});

router
  .route("/authenticate/:username")
  .post(bodyParser.json(), async (request, response) => {
    try {
      const user = await User.findOne({ username: request.params.username });
      if (user.passwordHash === request.body.passwordHash) {
        return response.status(200).json(user);
      }
      return response
        .status(403)
        .send(
          "Ensure that you've hashed the password using bcrypt before sending it to the server"
        );
    } catch (e) {
      return response.status(403).send(e);
    }
  });

export default router;
