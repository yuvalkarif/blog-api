import "dotenv";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    let verification;

    try {
      verification = await jwt.verify(req.token, process.env.JWT_KEY);

      next();
    } catch (err) {
      console.log(process.env.JWT_KEY);
      res.status(403).send("Forbidden, Invalid Token");
    }
  } else {
    res.status(403).send("Forbidden, No Token in Header");
  }
};

export default verifyToken;
