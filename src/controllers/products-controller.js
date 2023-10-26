import { PrismaClient } from "@prisma/client";
import "dotenv/config"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    // Busca todos los objetos existentes de la tabla Prenda 
    const products = await prisma.Prenda.findMany();

    // Devuelve el objeto creado con el estado de succefull
    res.status(200).json(products);

  } catch (error) {
    // Contrala si hubo un error en inesperado en el servidor
    res.status(500).json({ error: "No se a logrado conseguir la información" });
  }
};

export const createProduct = async (req, res) => {
  // Realiza una requeste de un body/json con las variables necesarias
  const { name, descripcion, imagen, stock, precio, genero, idCategoria, talle} = req.body;

  // Toma el token del usuario
  const token = req.headers.authorization;

  // Comprueba que las variables necesarias se hayan llegado correctamente
  if(!name || !descripcion || !stock || !precio || !genero || !imagen || !talle){
   return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // Verifica el token y toma la información del mismo
  const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  const nombre = name.toLowerCase();

  // Comprueba que stock no sea menor a 0
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
        idUser: data.id, // Toma la información obtenida del token y lo asigna a objeto
        genero,
        categorias: { connect: { id: idCategoria } } // Lo relaciona con una id que existe en categoria,
      },
    });

    // Devuelve el objeto creado con el estado de succefull
    res.status(201).json(newProduct);

   } catch (error) {
     // Contrala si hubo un error en inesperado en el servidor
    res.status(500).json({ error: "No se a logrado crear el producto" });
   }
};

export const getProductByName = async (req, res) => {
  // Realiza una request através de parametros un string llamado name
  const nombre = req.params.name;

  // Comprueba que los datos hayan llegao correctamente
  if (!nombre){
   return res.status(400).json({ error: "Faltan parametros 'nombre' " });
  }

  try{
    // Solicita a prisma que busque los objetos con nombre similar en la tabla Prenda
    const prendas = await prisma.Prenda.findMany({
      where: { nombre: { contains: nombre.toLowerCase() } },
    });

    // Controla si se encontro una prenda con ese nombre
    if (!prendas){
      return res.status(404).json({ message: "No sean encontrado prendas"});
    }

    // Devuelve el objeto creado con el estado de succefull
    res.status(200).json(prendas);

  }catch(error){
     // Contra si hubo un error en inesperado en el servidor
    res.status(500).json({ error: "error al buscar la prenda" });
  }

}

export const categoryFilter = async (req, res) => {
  const categoriaId = parseInt(req.params.id);
  const genero = req.params.genero;

  if(!genero || !categoriaId){
    return res.status(400).json({message: "faltan parametros"})
  }
  try {
    
    const prendas = await prisma.prenda.findMany({
      where: {
        genero: genero,
        categorias:{
          some:{
            id: categoriaId,
          },
        }
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
    res.status(500).json({error: "error al buscar la información"});
  }
}

export const getProductById = async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const producto = await prisma.Prenda.findUnique({
      where: {
        id: productId,
      },
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se a logrado encontrar el producto' });
  }
};