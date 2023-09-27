import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.Usuario.findMany();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error en el servidor, no se logro obtener el usuario" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = parseInt(req.body.id);

  //Se consulta si el valor que se ingreso en correcto
  if (isNaN(userId) || userId < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }

  try {
    const user = await prisma.Usuario.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "No se encontro el usuario" });
    }

    res.status(200).json({ name: user.nombre, email: user.email });
  } catch (error) {
    res.status(400).json({ error: "No se logro obtener la información" });
  }
};

export const createUser = async (req, res) => {
  // const { email, password, name } = req.params;
  const { nombre, apellido, fechaNacimiento, edad, email, cel, contrasena } =
    req.body;

  try {
    const newUser = await prisma.Usuario.create({
      data: {
        nombre,
        apellido,
        fechaNacimiento,
        email,
        contrasena,
        edad,
        cel,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "No se logro crear el usuario" });
  }
};

export const deleteUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }

  try {
    const deleteUser = await prisma.Usuario.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado eliminar el usuario" });
  }
  //Se elimina el usuario
};
