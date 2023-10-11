import express from "express";
import { getUsers, logIn } from "../controllers/users-controller.js";
import { createUser } from "../controllers/users-controller.js";
import { getUserProfile } from "../controllers/users-controller.js";
import { getProducts } from "../controllers/products-controller.js";
import { createProduct } from "../controllers/products-controller.js";
import { deleteUserById } from "../controllers/users-controller.js";
import { createComment } from "../controllers/comments-controller.js";
import { getComments } from "../controllers/comments-controller.js";
import { deleteComment } from "../controllers/comments-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/user/logIn", logIn)
router.post("/user/create", createUser);
router.get("/products", getProducts);


router.get("/users", getUsers);
router.delete("/users/delete", deleteUserById);
router.get("/users/profile/:id", getUserProfile);


// rutas para products-controller

router.post("/product/create", createProduct);

router.get("/comments", getComments);
router.post("/product/comment", createComment);
router.delete("/comments/delete", deleteComment);

export { router };
