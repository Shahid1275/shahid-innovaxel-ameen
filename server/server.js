import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import urlRouter from "./routes/urlRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", urlRouter);

// Redirect routes (mounted at root level)
app.use(urlRouter);

// Root endpoint
app.get("/", (req, res) => res.send("URL Shortener API is working Good"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
