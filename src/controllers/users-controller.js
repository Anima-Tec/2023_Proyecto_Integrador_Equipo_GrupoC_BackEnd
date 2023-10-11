import { PrismaClient } from "@prisma/client";
import { generateToken } from "../util/authUtils.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  const { token } = req.headers;
  verifyToken(token);

  try {
    const users = await prisma.User.findMany();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor, no se logro obtener el usuario" });
  }
};


export const getUserProfile = async (req, res) => {
  const { token } = req.headers;
  verifyToken(token);
  const userId = parseInt(req.body.id);


  if (isNaN(userId) || userId < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }

  //Se busca el usuario

  try {
    const user = await prisma.User.findUnique({
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
  const { name, surname, email, contrasena, edad, celular } = req.body;

  if (!name || !surname || !email || !contrasena || !edad || !celular) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const newUser = await prisma.User.create({
      data: {
        name,
        surname,
        email,
        contrasena,
        edad,
        celular,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "No se logro crear el usuario" });
  }
};

export const deleteUserById = async (req, res) => {
  const { token } = req.headers;
  verifyToken(token);
  
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }

  try {
    const deleteUser = await prisma.User.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json(deleteUser);

  } catch (error) {

    res.status(500).json({ error: "No se a logrado eliminar el usuario" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password){
    res.status(400).json({ error: "Ambos campos son requeridos" });
  }

  const user = await prisma.User.findUnique({ where: { email }});

  if (!user || user.contrasena !== password){
    res.status(401).json({ message: "credencial invalida"});
  }

  const token = generateToken(user.id, user.email)
  res.json({ token });

};