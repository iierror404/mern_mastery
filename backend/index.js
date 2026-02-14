import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cors from "cors";
import db_connect from "./config/db_connect.js";
import expressFileUpload from "express-fileupload";

import productRoutes from "./routes/productRoute.js";
import authRoutes from "./routes/authRoutes.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

db_connect();
app.listen(PORT, () => {
  console.log(`[🟢 SERVER] Server is Running on: http://localhost:${PORT}`);
});


if (process.env.NODE_ENV === "production") {
  // تحديد مجلد الـ Build مال الـ React
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // أي Route ما يعرفه الـ Backend، يخليه يروح للـ index.html مال React
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
