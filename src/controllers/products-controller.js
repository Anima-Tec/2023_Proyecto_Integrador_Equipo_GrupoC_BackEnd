// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// const products = [
//   { id: 1, name: "Product 1", price: 10.99 },
//   { id: 2, name: "Product 2", price: 19.99 },
// ];

export const getProducts = (req, res) => {
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, price } = req.params;

  if (!name || !price) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const newProduct = {
    name,
    price: parseFloat(price),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};
