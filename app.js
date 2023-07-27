import express from "express";
import { router } from "./src/routers/router.js";
import "dotenv/config";
//require("dotenv").config();

if (!process.env.PORT || process.env.PORT.trim() === "") {
  console.error(
    "La variable de entorno PORT no está definida en el archivo .env o está vacía."
  );
  process.exit(1);
}

const port = process.env.PORT;
const app = express();

app.use("/", router);

app.listen(port, () => {
  console.log("Server listen on");
});
