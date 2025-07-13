import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import router from "./routes/urlRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//url routes
app.use("/api", router);

// Root
app.get("/", (req, res) => res.send("Backend is working good!"));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Uncaught error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
