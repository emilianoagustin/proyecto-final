import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import notFound from "./src/middlewares/not-found.js";

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "SERVER WORKS!!!" });
});

app.use(notFound);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
