import bodyParser from "body-parser";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "./user.model";
import { jwtTokenSecret } from "../config";

const router = Router();

router.route("/").post(bodyParser.json(), async (request, response) => {
  try {
    const user = new User(request.body);
    user.createdAt = Date.now();
    await user.save();
    return response.status(200).json("User created!");
  } catch (e) {
    console.log(e);
    if (e.name === "MongoError" && e.code === 11000) {
      return response.status(409).send("Username already exists.");
    }
    return response.status(400).send(e);
  }
});

router
  .route("/authenticate/:username")
  .post(bodyParser.json(), async (request, response) => {
    try {
      const user = await User.findOne({ username: request.params.username });
      if (user.passwordHash === request.body.passwordHash) {
        const accessToken = jwt.sign(
          { userID: user._id.toString() },
          jwtTokenSecret
        );
        return response.status(200).json({ accessToken });
      }
      return response
        .status(403)
        .send(
          "Ensure that you've hashed the password using md5 before sending it to the server"
        );
    } catch (e) {
      return response.status(403).send(e);
    }
  });

export default router;
