import express from "express";
import { getUsers } from "../controllers/users-controller.js";
import { createUser } from "../controllers/users-controller.js";
import { getUserProfile } from "../controllers/users-controller.js";
import { getProducts } from "../controllers/products-controller.js";
import { createProduct } from "../controllers/products-controller.js";
import { deleteUser } from "../controllers/users-controller.js";

const router = express.Router();
// rutas para user-controller
router.get("/users", getUsers);
router.post("/users/create", createUser);
router.delete("/users/delete/:id", deleteUser);
router.get("/users/profile/:id", getUserProfile);

// rutas para products-controller
router.get("/products", getProducts);
router.post("/product/create", createProduct);

export { router };
