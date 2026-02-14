import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * @Desc Add New Product Controller
 * @Route POST /api/products/create
 */
export const createProductCtrl = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!req.files || !req.files.file)
      return res
        .status(400)
        .json({ success: false, message: "Please Upload Product Image." });

    const file = req.files.file;
    const tempPath = file.tempFilePath;

    if (!name || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "Please Enter All Product Data.",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: "MERN_Mastery",
    });

    fs.unlinkSync(tempPath);

    console.log(result.secure_url);

    const product = await Product.create({
      name,
      price,
      description,
      image: result.secure_url,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("[Error] Create Product Controller: \n", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  } finally {
    if (tempPath && fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
};

/**
 * @Desc Get All Products Controller
 * @Route GET /api/products/all
 */
export const getAllProcuctsCtrl = async (req, res) => {
  const products = await Product.find();

  if (products.length === 0)
    return res.status(200).json({
      success: true,
      message: "No Products.",
    });

  res.status(200).json({
    success: true,
    products,
  });
};

/**
 * @Desc Delete Product Controller
 * @Route DELETE /api/products/del-product/:id
 */
export const deleteProductCtrl = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        success: false,
        message: "No Id Provided.",
      });

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully.",
    });
  } catch (error) {
    console.log("[Error] Delete Product Controller: \n", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/**
 * @Desc Edit Product Controller
 * @Route PUT /api/products/edit-product/:id
 */
export const editProductCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const file = req.files?.file;

    if (!name && !price && !description)
      return res.status(400).json({
        success: false,
        message: "No Changes To Update.",
      });

    const product = await Product.findById(id);

    if (!product)
      return res.status(400).json({
        success: false,
        message: "No Product With This Id.",
      });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    if (file) {
      const tempPath = file.tempFilePath;

      const oldPublicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`MERN_Mastery/${oldPublicId}`);

      const result = await cloudinary.uploader.upload(tempPath, {
        folder: "MERN_Mastery",
      });
      product.image = result.secure_url;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Upteded Successfully.",
      product,
    });
  } catch (error) {
    console.log("[Error] Edit Product Controller: \n", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  } finally {
    if (tempPath && fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
};
