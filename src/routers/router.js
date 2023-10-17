import express from "express";
import { getUserByName, getUsers, logIn } from "../controllers/users-controller.js";
import { createUser } from "../controllers/users-controller.js";
import { getUserProfile } from "../controllers/users-controller.js";
import { allCategorys, categoryFilter, getProductByName, getProducts } from "../controllers/products-controller.js";
import { createProduct } from "../controllers/products-controller.js";
import { deleteUserById } from "../controllers/users-controller.js";
import { createComment } from "../controllers/comments-controller.js";
import { getComments } from "../controllers/comments-controller.js";
import { deleteComment } from "../controllers/comments-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createArticle } from "../controllers/article-controller.js";


const router = express.Router();

router.post("/user/logIn", logIn)
router.post("/user/singIn", createUser);
router.get("/products", getProducts);
router.get("/productName", getProductByName)

router.get("/user/name",verifyToken, getUserByName)

router.get("/users", verifyToken, getUsers);
router.get("/product/cat", categoryFilter);
router.delete("/user/:id", deleteUserById);

router.get("/users/profile", getUserProfile);
router.post("/article",verifyToken , createArticle);
router.get("/category", allCategorys);


// rutas para products-controller

router.post("/product",verifyToken , createProduct);

router.get("/comments", getComments);
router.post("/product/comment", verifyToken, createComment);
router.delete("/comments", verifyToken, deleteComment);

export { router };
