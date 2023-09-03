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

export const getCategory = async (req, res) => {
  try {
    const cat = await prisma.Categoria.findMany();
    console.log(cat);
    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado conseguir la información" });
  }
};

export const createProduct = async (req, res) => {
  const { nombre, descripcion, stock, precio, id_vendedor, talle } = req.body;

  if (!nombre || !descripcion || !stock || !precio || !id_vendedor || !talle) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // try {
  const newProduct = await prisma.Prenda.create({
    data: {
      nombre,
      descripcion,
      stock,
      id_vendedor,
      precio,
      talle,
    },
  });
  res.status(201).json(newProduct);
  // } catch (error) {
  //   res.status(500).json({ error: "No se a logrado crear el producto" });
  // }
};

export const getProductByName = async (req, res) => {
  const name = req.body.name;
  try {
    const data = await prisma.Prenda.findMany({
      where: {
        nombre: name,
      },
    });

    if (data.length === 0) {
      return res.status(404).json({ error: "No se encontro la prenda." });
    }

    res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "No se logro conectar con el servidor" });
  }
};

export const filterByCat = async (req, res) => {
  const { cat } = req.body;

  // try {
  const categoria = await prisma.Categoria.findUnique({
    where: {
      nombre: cat,
    },
  });

  if (!categoria) {
    return res.status(404).json({ error: "No se encontro el usuario" });
  }

  console.log(categoria);
  // } catch (error) {
  //   res.status(500).json({ error: error });
  // }
};
