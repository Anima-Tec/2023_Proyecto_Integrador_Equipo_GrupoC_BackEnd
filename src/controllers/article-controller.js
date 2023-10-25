// Se importa Prisma Client y se le asigna una variable para llamarlo
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createArticle = async (req, res) =>{
    // Hace una request de Json/body solicitando las variables
    const { name, descripcion, lugar_retiro } = req.body;
  

    try {
      // Solicita a prisma clien que cree un insert en la tabla Articulo con los datos obtenidos

        const newProduct = await prisma.articulo.create({
            data:{
                name,
                descripcion,
                lugar_retiro,
            }
        })
        
        // Devuelve el objeto creado con el estado de succefull
        res.status(201).json(newProduct);
    
       } catch (error) {
        // Contra si hubo un error en inesperado en el servidor
        console.log(error);
        res.status(500).json({ error: "No se a logrado crear el producto" });
       }
};

export const getArticles = async (req, res) => {
    try {

      // Busca todos los objetos que existen en la tabla de Articulo
      const products = await prisma.Articulo.findMany();

      // Devuelve el objeto creado con el estado de succefull
      res.status(200).json(products);
  
    } catch (error) {
      // Contra si hubo un error en inesperado en el servidor
      res.status(500).json({ error: "No se a logrado conseguir la información" });
    }
  };