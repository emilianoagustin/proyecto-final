import "dotenv/config";
import express from "express";
import cors from "cors";
import notFound from "./src/middlewares/not-found.js";
import verifyToken from "./src/middlewares/verify-token.js";
import productRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const allowedOrigin = "https://front-proyecto-final.vercel.app";
const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
