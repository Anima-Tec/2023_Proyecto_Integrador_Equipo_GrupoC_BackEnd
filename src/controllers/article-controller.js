import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createArticle = async (req, res) =>{
    const { name, descripcion, lugar_retiro } = req.body;
    try {
        const newProduct = await prisma.articulo.create({
            data:{
                name,
                descripcion,
                lugar_retiro,
            }
        })
    
        res.status(201).json(newProduct);
    
       } catch (error) {
        console.log(error);
        res.status(500).json({ error: "No se a logrado crear el producto" });
       }
};

export const getArticles = async (req, res) => {
    try {
  
      const products = await prisma.Articulo.findMany();
      res.status(200).json(products);
  
    } catch (error) {
      res.status(500).json({ error: "No se a logrado conseguir la información" });
    }
  };