const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const helmet = require("helmet");

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// CORS configuration (IMPORTANT for Vercel frontend) and local production
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://campus-event-hub-e44l.vercel.app"
  ],
  credentials: true
}));

// Initialize passport (for Google OAuth)
require("./config/passport");
app.use(passport.initialize());

// Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const initReminderJob = require("./utils/reminderJob");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/notifications", notificationRoutes);

// Static uploads
app.use("/uploads", express.static("uploads"));

// Start scheduled jobs
initReminderJob();

// Google OAuth Routes
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => {
    try {
      const frontend = process.env.FRONTEND_URL;

      // Redirect with token
      res.redirect(`${frontend}/auth/success?token=${req.user.token}`);
    } catch (error) {
      console.error("OAuth Error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  }
);

// Health check route (for testing deployment)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});