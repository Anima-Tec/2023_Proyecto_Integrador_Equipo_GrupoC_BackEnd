import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const users = [
//   { id: 1, name: "Jhon Doe", email: "jhon@gmail.com", password: "12345678" },
//   { id: 2, name: "Jane Doe", email: "jane@gmail.com", password: "abcdefg" },
// ];

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany;
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

export const createUser = async (req, res) => {
  // const { email, password, name } = req.params;
  const { email, password, name } = req.body;

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  res.status(201).json(newUser);
};

export const deleteUserById = async (req, res) => {
  // const id = parseInt(req.params.id);
  const userId = parseInt(req.params.id);

  if (userId === -1) {
    return res.status(406).json({ error: "ID invalida" });
  }

  //Se busca el usuario
  if (!userId) {
    return res.status(404).json({ error: "Id no encontrada" });
  }

  // //Se confirma que exista en la base de datos
  // if (user === -1) {
  //   res.status(404).json({ error: "Usuario no encontrado" });
  // }

  const deleteUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  //Se elimina el usuario
  res.status(200).json(deleteUser);
};
