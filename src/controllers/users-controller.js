import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor, no se logro obtener el usuario" });
  }
};

// const getUserById = (id) => {
//   return users.find((user) => user.id === id);
// };

export const getUserProfile = async (req, res) => {
  const userId = parseInt(req.params.id);

  //Se consulta si el valor que se ingreso en correcto
  if (isNaN(userId) || userId < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }
  //Se busca el usuario
  // const user = getUserById(userId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "No se encontro el usuario" });
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "No se logro obtener la información" });
  }
};

export const createUser = async (req, res) => {
  // const { email, password, name } = req.params;
  const { email, password, name } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "No se logro crear el usuario" });
  }
};

export const deleteUserById = async (req, res) => {
  // const id = parseInt(req.params.id);
  const userId = parseInt(req.params.id);

  if (isNaN(userId) || userId < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }

  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado eliminar el usuario" });
  }
  //Se elimina el usuario
};
