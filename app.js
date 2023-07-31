import express from "express";
import { router } from "./src/routers/router.js";
import { checkPort } from "./src/config/enviroment-comprobate.js";
import "dotenv/config";
//require("dotenv").config();

checkPort(process.env.PORT);

const port = process.env.PORT;
const app = express();

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
