import express from "express";
import { getUsers } from "../controllers/users-controller.js";
import { createUser } from "../controllers/users-controller.js";
import { getUserProfile } from "../controllers/users-controller.js";
import { getProducts } from "../controllers/products-controller.js";
import { deleteUser } from "../controllers/users-controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users/create/:email/:password/:name", createUser);
router.delete("/users/delete/:id", deleteUser);
router.get("/users/profile/:id", getUserProfile);
router.get("/products", getProducts);

export { router };
