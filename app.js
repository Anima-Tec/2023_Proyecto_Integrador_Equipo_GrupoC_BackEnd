// Se solicitan los import necesarios
import express from "express";
import { router } from "./src/routers/router.js";
import { checkKey, checkPort } from "./src/config/enviroment-comprobate.js";
import { checkUrl } from "./src/config/enviroment-comprobate.js";
import cors from "cors";
import "dotenv/config";

// Se llaman funciones para que confirmen los varoler y existencia de variables en el .env
// La variables que se utilizan son necesarias para correr el programa.
checkPort(process.env.PORT);
checkUrl(process.env.DATABASE_URL);
checkKey(process.env.JWT_ACCESS_SECRET);

// Se toma el valor del puerto en el que va corre el programa através del archivo .env
const port = process.env.PORT;
const app = express();

// Cors permite a cierta ruta ralizar ciertos metodos http
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Dice que el servicio utilize cors
app.use(cors(corsOptions));
// Dice que la app resiva y retorne archivos json
app.use(express.json());
// Dice que la app use archivo router
app.use("/", router);


// Dice que el puerto en el va a funcionar el que esta en el .env
app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
