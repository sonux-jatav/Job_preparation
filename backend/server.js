// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// __dirname fix in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-url.vercel.app"]
}));
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/mcq", mcqRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/admin", adminRoutes);

// Serve frontend (React build)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
