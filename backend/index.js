import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import authRoutes from "./routes/authRoute.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json()); //to parse incoming requests : req.body in json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", tasksRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
