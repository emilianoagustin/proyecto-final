import "dotenv/config";
import cors from "cors";

const allowedOrigin = [process.env.CORS_ORIGIN, "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigin.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
