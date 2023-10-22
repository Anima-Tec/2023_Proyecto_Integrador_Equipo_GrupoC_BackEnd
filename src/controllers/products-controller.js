import { PrismaClient } from "@prisma/client";
import "dotenv/config"
import jwt from "jsonwebtoken"
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


  const { name, descripcion, imagen, stock, precio, genero, idCategoria, talle} = req.body;

  const token = req.headers.authorization;

  if(!name || !descripcion || !stock || !precio || !genero || !imagen || !talle){
   return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  const nombre = name.toLowerCase();

  if(stock < 1 ){
    return res.status(400).json({ error: "Stock debe ser mayor a '0'" });
  }

  try {
    const newProduct = await prisma.Prenda.create({
      data: {
        nombre,
        descripcion,
        imagen,
        stock,
        talle,
        precio,
        idUser: data.id,
        genero,
        categorias: { connect: { id: idCategoria } },
      },
    });

    res.status(201).json(newProduct);

   } catch (error) {
    res.status(500).json({ error: "No se a logrado crear el producto" });
   }
};

export const getProductByName = async (req, res) => {
  const nombre = req.params.name;

  if (!nombre){
   return res.status(400).json({ error: "Faltan parametros 'nombre' " });
  }

  try{
    const prendas = await prisma.Prenda.findMany({
      where: { nombre: { contains: nombre.toLowerCase() } },
    });

    if (!prendas){
      return res.status(404).json({ message: "No sean encontrado prendas"});
    }

    res.status(200).json(prendas);

  }catch(error){
    res.status(500).json({ message: "error al buscar la prenda" });
  }

}

export const categoryFilter = async (req, res) => {
  const categoriaId = parseInt(req.params.id);
  const genero = req.params.genero

  if(!genero || !categoriaId){
    return res.status(400).json({message: "faltan parametros"})
  }
  try {

    const prendas = await prisma.prenda.findMany({
      where: {
        genero: genero,
        idCategoria: categoriaId,
      },
    });

    
    res.status(200).json(prendas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ocurrió un error al obtener las prendas.' });
  }
}

export const allCategorys = async (req, res) => {
  try {

    const cats = await prisma.Categoria.findMany();
    res.status(200).json(cats);

    } catch (error) {
      res
      .status(500)
      .json({ error: "Error en el servidor, no se logro obtener el usuario" });
    }
  
}

export const deleteProductById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "Id invalida" });
  }

  try {
    const deleteProduct = await prisma.Prenda.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({message: "El producto se a eliminado correctamente"});

  } catch (error) {
    res.status(500).json({ error: "No se a logrado eliminar el usuario" });
  }
}

export const getProductByGenero = async (req, res) =>{
  try {
    const genero = req.params.genero; // Obtener el género del query param

    if (!genero) {
      return res.status(400).json({ error: 'El parámetro género es requerido' });
    }

    // Consultar la base de datos para encontrar prendas con el género especificado
    const prendas = await prisma.prenda.findMany({
      where: {
        genero: genero,
      },
    });

    res.json(prendas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar prendas por género' });
  }
}

export const getUserProductos = async (req, res) => {
  const token = req.headers.authorization;

  if (!token){
    return res.status(401).json({ message: "Token Faltante"})
  }

  try{
    const data = jwt.verify(token,  process.env.JWT_ACCESS_SECRET);

    const product= await prisma.Prenda.findMany({
      where: {
        idUser: data.id,
      },
    });

    if(!product){
      return res.status(404).json({message:"El usuario no tiene productos"})
    }

    res.status(201).json(product)
  }catch(error){
    res.status(500).json({message: "error al buscar la información"});
  }
}