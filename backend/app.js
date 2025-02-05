import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnection } from "./database/dbconnection.js";
import { errorMiddleware } from "./error/error.js";

import reservationRouter from "./routes/reservationRoutes.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.get("/", (req,res) => {
  res.json({
    message: "Hello"
  })
})
const allowedOrigins = ["https://cafe-site-596l.vercel.app"];
// Middleware for CORS
app.use(
  cors({
    // origin: process.env.FRONTEND_URL, // Allow only your frontend's URL
    origin: ["https://cafe-site-596l.vercel.app", "https://cafe-site-orpin.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Set additional headers (optional, for clarity)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Explicitly handle preflight OPTIONS requests
app.options("*", cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
dbconnection();

// Use custom error middleware
app.use(errorMiddleware);

// API routes
app.use("/api/v1/reservation", reservationRouter);

// Log the frontend URL for debugging
console.log("Frontend URL:", process.env.FRONTEND_URL);

export default app;

