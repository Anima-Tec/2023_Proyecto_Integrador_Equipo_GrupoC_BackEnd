import { getUserById } from "./users-controller.js";

const getUserProfile = (req, res) => {
  const userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ error: "ID invalida" });
  }

  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(user);
};

export { getUserProfile };
