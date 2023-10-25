// Se importa Prisma Client y se le asigna una variable para llamarlo
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createComment = async (req, res) => {

  // Hace una request de Json/body solicitando las variables
  const text = req.body.text;

  // Confirma que la variable text solicitada exista o haya llegado
  if (!text) {
    return res.status(400).json({ error: "El campo de texto es requerido" });
  }

  try {
    // Solicita a prisma que cree un insert en la tabla Comment con el dato solicitado
    const newComment = await prisma.Comment.create({
      data: {
        text,
      },
    });

    // Devuelve el objeto creado con el estado de succefull
    res.status(201).json(newComment);

  } catch (error) {
    // Contra si hubo un error en inesperado en el servidor
    res.status(500).json({ error: "No se logrado crear el comentario" });
  }
};

export const getComments = async (req, res) => {
  try {
    // Busca todos los obejtos que existen en la tabla Comment
    const data = await prisma.Comment.findMany();

    // Devuelve el objeto creado con el estado de succefull
    res.json(data);

  } catch (error) {
    // Contra si hubo un error en inesperado en el servidor
    res
      .status(500)
      .json({ error: "Error en el servidor, no se logro obtener" });
  }
};

export const deleteComment = async (req, res) => {
  // Hace una request de Json/body solicitando las variables
  const id = parseInt(req.body.id);

  // Comprueba que la variable no es un número o si es menor a 0 
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }

  try {
    // Elimina el objeto existente que su "id" sea igual a la "id" ingresada
    const deletes = await prisma.Comment.delete({
      where: {
        id: id,
      },
    });

    // Devuelve el objeto creado con el estado de succefull
    res.status(200).json(deletes);

  } catch (error) {
    // Contra si hubo un error en inesperado en el servidor
    res.status(500).json({ error: "No se a logrado eliminar el comentario" });
  }
};
