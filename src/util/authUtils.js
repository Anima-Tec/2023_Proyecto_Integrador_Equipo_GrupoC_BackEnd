import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_ACCESS_SECRET;

export const generateToken = (id, email) => {
  return jwt.sign({ id, email }, secretKey, {
    expiresIn: "1h",
  });
};
