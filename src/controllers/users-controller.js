// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const users = [
  { id: 1, name: "Jhon Doe", email: "jhon@gmail.com", password: "12345678" },
  { id: 2, name: "Jane Doe", email: "jane@gmail.com", password: "abcdefg" },
];

export const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

export const getUserProfile = (req, res) => {
  const userId = parseInt(req.params.id);

  //Se consulta si el valor que se ingreso en correcto
  if (!userId) {
    return res.status(400).json({ error: "ID invalida" });
  }

  //Se busca el usuario
  const user = getUserById(userId);

  //Se confirma si el usuario existe
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  //Devuele los datos del usuario
  res.json(`name: ${user.name} email: ${user.email}`);
};

export const createUser = (req, res) => {
  const { email, password, name } = req.params;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  // Verificamos si el email ya existe en la lista de usuarios
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(403).json({ error: "El email ya está registrado." });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "email invalido" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "contraseña incorrecta" });
  }

  // Generamos un nuevo ID para el usuario
  const id = users.length + 1;

  // Creamos el nuevo usuario
  const newUser = {
    id,
    name,
    email,
    password,
  };

  // Agregamos el nuevo usuario a la lista
  users.push(newUser);

  res.status(201).json(newUser);
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  //Se busca el usuario
  const user = users.findIndex((user) => user.id === id);

  //Se confirma que exista en la base de datos
  if (user === -1) {
    res.status(404).json({ error: "Usuario no encontrado" });
  }

  //Se elimina el usuario
  users.splice(user, 1);
  res.status(200).json({ message: "Usuario eliminado correctamente" });
};
