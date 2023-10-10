import express from "express";
import { router } from "./src/routers/router.js";
import { checkKey, checkPort } from "./src/config/enviroment-comprobate.js";
import { checkUrl } from "./src/config/enviroment-comprobate.js";
import "dotenv/config";

//Se compueba si existe las variables de entorno que se necesitan para correr el programa
checkPort(process.env.PORT);
checkUrl(process.env.DATABASE_URL);
checkKey(process.env.JWT_ACCESS_SECRET);

const port = process.env.PORT;

const app = express();

app.use();
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
