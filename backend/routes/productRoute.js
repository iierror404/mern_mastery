import express from "express";
import {
  createProductCtrl,
  deleteProductCtrl,
  editProductCtrl,
  getAllProcuctsCtrl,
} from "../controllers/productController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protectedRoute, createProductCtrl);
router.get("/all", getAllProcuctsCtrl);
router.delete("/del-product/:id", protectedRoute,deleteProductCtrl);
router.put("/edit-product/:id", protectedRoute,editProductCtrl);

export default router;
