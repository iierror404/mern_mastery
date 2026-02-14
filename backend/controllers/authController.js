import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * @desc Register New User
 * @Route POST /api/auth/register
 */
export const registerCtrl = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All Fields Is Required",
      });

    let user = await User.findOne({ email });
    if (user)
      return res.status(200).json({
        success: false,
        message: "User Already Exist, Please Login.",
      });

    user = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      success: true,
      message: "User Created Successfully.",
      user: {
        name,
        email,
        token,
        createdAt: user.createdAt
      },
    });
  } catch (error) {
    console.log(error); // خليها للتيرمنال مالتك

    // إذا كان الخطأ من نوع ValidationError مال Mongoose 🕵️‍♂️
    if (error.name === "ValidationError") {
      // نأخذ بس أول رسالة خطأ تطلع (مثلاً: Please fill a valid email address)
      const message = Object.values(error.errors).map((val) => val.message)[0];
      return res.status(400).json({ success: false, message });
    }

    // إذا كان الإيميل مكرر (MongoServerError: E11000)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

/**
 * @desc Login New User
 * @Route POST /api/auth/login
 */
export const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "All Fields Required.",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password.",
      });

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password.",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        token,
      },
    });
  } catch (error) {
    console.log(error); // خليها للتيرمنال مالتك

    // إذا كان الخطأ من نوع ValidationError مال Mongoose 🕵️‍♂️
    if (error.name === "ValidationError") {
      // نأخذ بس أول رسالة خطأ تطلع (مثلاً: Please fill a valid email address)
      const message = Object.values(error.errors).map((val) => val.message)[0];
      return res.status(400).json({ success: false, message });
    }

    // إذا كان الإيميل مكرر (MongoServerError: E11000)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

/**
 * @desc Get All Users
 * @Route POST /api/auth/users/all
 */
export const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("[ERROR] - Get AlLl Users Controller: \n", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
