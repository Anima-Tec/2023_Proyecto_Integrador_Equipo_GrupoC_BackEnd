import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createComment = async (req, res) => {
  const { productId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "El campo de texto es requerido" });
  }

  try {
    const newComment = await prisma.commment.create({
      data: {
        text,
        productId: parseInt(productId),
      },
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "No se logrado crear el comentario" });
  }
};
