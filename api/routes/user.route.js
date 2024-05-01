import express from "express";
import {
  getUser,
  getUsers,
  searchUsers,
  updateUser,
} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search/:id", verifyToken, getUser);
router.get("/search", verifyToken, searchUsers)
router.put("/:id", verifyToken, updateUser);

export default router;
