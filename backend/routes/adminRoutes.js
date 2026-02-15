import express from "express";
import { onlyAdmin, protectedRoute } from "../middlewares/authMiddleware.js";
import {
  deleteUserCtrl,
  getAllUsersCtrl,
  userAccountStatusCtrl,
} from "../controllers/adminController.js";
import {
  createProductCtrl,
  deleteProductCtrl,
  editProductCtrl,
  getAllProcuctsCtrl,
} from "../controllers/productController.js";

const router = express.Router();

// * Users Routes
router.get("/users/all", protectedRoute, onlyAdmin, getAllUsersCtrl);
router.put(
  "/users/status/:id",
  protectedRoute,
  onlyAdmin,
  userAccountStatusCtrl,
);
router.delete("/users/delete/:id", protectedRoute, onlyAdmin, deleteUserCtrl);

// * Products Routes
router.post("/create", protectedRoute, onlyAdmin, createProductCtrl);
router.get("/all", protectedRoute,onlyAdmin ,getAllProcuctsCtrl);
router.delete("/del-product/:id", protectedRoute, onlyAdmin, deleteProductCtrl);
router.put("/edit-product/:id", protectedRoute, onlyAdmin, editProductCtrl);

export default router;
