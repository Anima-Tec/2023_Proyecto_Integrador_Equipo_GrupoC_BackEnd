import express from "express";
import { router } from "./src/routers/router.js";

const app = express();

app.use("/", router);

app.listen(3000, () => {
  console.log("Server listen on");
});
