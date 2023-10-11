import jwt from "jsonwebtoken";
import { generateToken } from "../util/authUtils.js";

export const verifyToken = (token) => {

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, generateToken, (error, decoded) => {
    
    if (error) {
      return res.status(403).json({ message: "Token inavalido" });
    }

    req.usuarioId = decoded.id;
    next();
  });
};
