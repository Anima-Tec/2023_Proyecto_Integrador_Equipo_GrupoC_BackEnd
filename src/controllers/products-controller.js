import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado conseguir la información" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, type } = req.body;

  if (!name || !price || !type) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        type,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado crear el producto" });
  }

  // const { name, price } = req.params;

  // if (!name || !price) {
  //   return res.status(400).json({ error: "Todos los campos son obligatorios" });
  // }

  // const newProduct = {
  //   name,
  //   price: parseFloat(price),
  // };

  // products.push(newProduct);
  // res.status(201).json(newProduct);
};
