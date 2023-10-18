import express from "express";
import { getUserByName, getUsers, logIn } from "../controllers/users-controller.js";
import { createUser } from "../controllers/users-controller.js";
import { getUserProfile } from "../controllers/users-controller.js";
import { allCategorys, categoryFilter, deleteProductById, getProductByName, getProducts } from "../controllers/products-controller.js";
import { createProduct } from "../controllers/products-controller.js";
import { deleteUserById } from "../controllers/users-controller.js";
import { createComment } from "../controllers/comments-controller.js";
import { getComments } from "../controllers/comments-controller.js";
import { deleteComment } from "../controllers/comments-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createArticle, getArticles } from "../controllers/article-controller.js";

const router = express.Router();

// Rutas de users-controller

router.post("/user/logIn", logIn)
router.post("/user/singIn", createUser);
router.get("/users/profile", getUserProfile);
router.get("/users", verifyToken, getUsers);
router.get("/user/name",verifyToken, getUserByName)
router.delete("/user/:id",verifyToken ,deleteUserById);

// Rutas de products-controllers

router.get("/products", getProducts);
router.post("/product",verifyToken , createProduct);
router.get("/productName", getProductByName)
router.get("/product/cat", categoryFilter);
router.get("/category", allCategorys);
router.delete("/product/:id", verifyToken, deleteProductById);

// Rutas de comment-controller y article-controller

router.get("/comments", getComments);
router.post("/comment", verifyToken, createComment);
router.delete("/comments", verifyToken, deleteComment);
router.post("/article",verifyToken , createArticle);
router.get("/articles", getArticles);

export { router };
