import "dotenv/config";
import express from "express";
import notFound from "./src/middlewares/not-found.js";
import verifyToken from "./src/middlewares/verify-token.js";
import productRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./src/middlewares/corsConfig.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.options("*", corsMiddleware);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
