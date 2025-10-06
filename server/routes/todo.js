import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodos } from "../controllers/todo.js";
import isAuthanticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthanticated, createTodo);
router.route("/getTodo").get(getAllTodos);
router.route("/updateTodo/:todoId").put(isAuthanticated, updateTodos);
router.route("/delete/:id").delete(deleteTodo)
export default router;