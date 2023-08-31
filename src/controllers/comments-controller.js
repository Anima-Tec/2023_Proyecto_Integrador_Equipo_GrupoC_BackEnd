import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createComment = async (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "El campo de texto es requerido" });
  }

  try {
    const newComment = await prisma.Comment.create({
      data: {
        text,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "No se logrado crear el comentario" });
  }
};

export const getComments = async (req, res) => {
  try {
    const data = await prisma.Comment.findMany();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor, no se logro obtener" });
  }
};

export const deleteComment = async (req, res) => {
  const id = parseInt(req.body.id);

  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }
  try {
    const deletes = await prisma.Comment.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deletes);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado eliminar el comentario" });
  }
};
