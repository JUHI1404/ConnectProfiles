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
router.get("/search/:id", getUser);
router.get("/search", searchUsers)
router.put("/:id", updateUser);

export default router;
