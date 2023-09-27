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

export const getAllCategory = async (req, res) => {
  try {
    const cat = await prisma.Categoria.findMany();
    console.log(cat);
    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json({ error: "No se a logrado conseguir la información" });
  }
};

export const createProduct = async (req, res) => {
  const { nombre, descripcion, stock, precio, id_vendedor, talle, catName } =
    req.body;

  if (
    !nombre ||
    !descripcion ||
    !stock ||
    !precio ||
    !id_vendedor ||
    !talle ||
    !catName
  ) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
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
  } catch (error) {
    res.status(500).json({ error: "No se a logrado crear el producto" });
  }
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

export const getCat = async (req, res) => {
  const { category } = req.body;

  try {
    const findCategory = await prisma.categoria.findFirst({
      where: { nombre: category },
      include: {
        prendas: true,
      },
    });

    if (!findCategory) {
      return res.status(404).json({ message: "esa categoria no existe" });
    }

    res.status(200).json(findCategory.prendas);
  } catch (error) {
    res.status(400).json({ error: "" });
  }
};
