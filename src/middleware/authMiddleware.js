import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token faltante' });
  }

  try {
    
    const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.usuario_id = data.usuario_id; 
    next();

  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido' });

  }
}
