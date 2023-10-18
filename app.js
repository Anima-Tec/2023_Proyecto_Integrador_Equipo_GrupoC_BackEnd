import express from "express";
import { router } from "./src/routers/router.js";
import { checkKey, checkPort } from "./src/config/enviroment-comprobate.js";
import { checkUrl } from "./src/config/enviroment-comprobate.js";
import cors from "cors";
import "dotenv/config";

checkPort(process.env.PORT);
checkUrl(process.env.DATABASE_URL);
checkKey(process.env.JWT_ACCESS_SECRET);

const port = process.env.PORT;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);


app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
