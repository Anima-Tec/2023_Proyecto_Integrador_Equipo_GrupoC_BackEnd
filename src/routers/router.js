import express from "express";
import { getUsers } from "../controllers/users-controller.js";
import { createUser } from "../controllers/users-controller.js";
import { getUserProfile } from "../controllers/profile-controller.js";
import { getProducts } from "../controllers/products-controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users/create/:email/:password/:name", createUser);
router.get("/profile/:id", getUserProfile);
router.get("/products", getProducts);

export { router };
