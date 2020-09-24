import * as jwt from "jsonwebtoken";
import { jwtTokenSecret } from "../config";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      reason:
        "Please authenticate yourself by passing a BEARER Token in the header of this request",
    });
  }
};
