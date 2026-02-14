import express from "express";
import { getAllUsersCtrl, loginCtrl, registerCtrl } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/users/all", getAllUsersCtrl);

export default router;
