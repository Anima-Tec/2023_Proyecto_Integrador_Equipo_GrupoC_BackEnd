import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req, res, next) => {

  const token = req.headers.out;
  const secretKey = process.env.JWT_ACCESS_SECRET;

  if (!token) {
    return res.status(403).json({ error: 'Token nulo' });
  }

  jwt.verify(token, secretKey, (error, decoded) => {

    if (error) {
      console.error(error);
    }

    req = decoded;
    next();
  });
};
