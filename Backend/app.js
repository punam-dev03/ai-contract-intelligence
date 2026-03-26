import express from "express";
import contractRoutes from "./routes/contractRoutes.js";
import comparisonRoutes from "./routes/comparisonRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comparison", comparisonRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("AI Contract Intelligence Backend Running 🚀");
});

export default app;