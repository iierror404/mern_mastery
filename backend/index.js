import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import db_connect from "./config/db_connect.js";
import expressFileUpload from "express-fileupload";

import productRoutes from "./routes/productRoute.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

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

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

db_connect();
app.listen(PORT, () => {
  console.log(`[🟢 SERVER] Server is Running on: http://localhost:${PORT}`);
});
