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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
