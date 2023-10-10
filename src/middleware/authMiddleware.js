import jwt from "jsonwebtoken";
import { generateToken } from "../util/authUtils.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, generateToken, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Token inavalido" });
    }

    req.usuarioId = decoded.indexOf;
    next();
  });
};
