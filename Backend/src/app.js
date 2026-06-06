const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const bankRoutes = require("./routes/bank.routes"); 
const investmentRoutes = require("./routes/investment.routes");
const goalRoutes = require("./routes/goal.routes"); 
const aiRoutes = require("./routes/ai.routes"); 
const userRoutes = require("./routes/user.routes"); 
const overviewRoutes = require("./routes/overview.routes"); 
const contactRoutes = require("./routes/contact.routes");

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", postRoutes);
app.use("/api/banks", bankRoutes); 
app.use("/api/investments", investmentRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/ai", aiRoutes); 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/overview", overviewRoutes);
app.use("/api/contact", contactRoutes);
module.exports = app;


