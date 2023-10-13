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


  const { nombre, descripcion, stock, precio, idCategoria} = req.body;
  nombre = nombre.toLowerCase();



  if (!nombre || !descripcion || !stock || !precio) {
    res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const newProduct = await prisma.Prenda.create({
      data: {
        nombre,
        descripcion,
        stock,
        precio,
        categorias: { connect: { id: idCategoria } },
      },
    });

    res.status(201).json(newProduct);

   } catch (error) {
    res.status(500).json({ error: "No se a logrado crear el producto" });
   }
};

export const getProductByName = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre){
    res.status(400).json({ error: "Faltan parametros 'nombre' " });
  }

  try{
    const prendas = await prisma.Prenda.findMany({
      where: { nombre: { contains: nombre.toLowerCase() } },
    });

    if (!prendas){
      res.status(404).json({ message: "No sean encontrado prendas"});
    }

    res.status(200).json(prendas);

  }catch(error){
    res.status(500).json({ message: "error al buscar la prenda" });
  }

}

export const categoryFilter = async (req, res) => {
  try {
    const { id } = req.body; // Recibe el parámetro de consulta "categoria"

    if (!id) {
      return res.status(400).json({ error: 'Debes proporcionar una categoría.' });
    }

    const prendas = await prisma.prenda.findMany({
      where: {
        categorias: {
          some: {
            id: id, // Filtra por nombre de categoría
          },
        },
      },
    });
  
    return res.json(prendas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener las prendas.' });
  }
}
