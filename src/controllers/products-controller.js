import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.Prenda.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado conseguir la información" });
  }
};

export const createProduct = async (req, res) => {
  const { nombre, descripcion, stock, precio } = req.body;

  if (!nombre || !descripcion || !stock || !precio) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const newProduct = await prisma.Prenda.create({
      data: {
        nombre,
        descripcion,
        stock,
        precio,
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
