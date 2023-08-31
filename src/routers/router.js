import express from "express";
import { getUsers } from "../controllers/users-controller.js";
import { createUser } from "../controllers/users-controller.js";
import { getUserProfile } from "../controllers/users-controller.js";
import { getProducts } from "../controllers/products-controller.js";
import { createProduct } from "../controllers/products-controller.js";
import { getProductByName } from "../controllers/products-controller.js";
import { deleteUserById } from "../controllers/users-controller.js";
import { createComment } from "../controllers/comments-controller.js";
import { getComments } from "../controllers/comments-controller.js";

const router = express.Router();

// rutas para user-controller
router.get("/users", getUsers);
router.post("/users/create", createUser);
router.delete("/users/delete", deleteUserById);
router.get("/users/profile", getUserProfile);

// rutas para products-controller
router.get("/products", getProducts);
router.get("/products/name", getProductByName);
router.post("/product/create", createProduct);

router.get("/comments", getComments);
router.post("/product/comment", createComment);

export { router };
