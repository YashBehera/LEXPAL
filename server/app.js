import express from "express";
import cookieParser from "cookie-parser"

import cors from "cors";

import authRouter from "./src/routes/auth.route.js";
import uploadRouter from "./src/routes/upload.route.js";
import AIRouter from "./src/routes/AI.route.js";
import userRouter from "./src/routes/user.route.js";
import exploreRouter from "./src/routes/explore.route.js";


const app = express();



// server/app.js

const allowedOrigins = [
  "https://lexpal.in",
  "https://www.lexpal.in",
  "http://localhost:3000", // Add your local development URL
  "http://localhost:5173"  // Add Vite default if applicable
];

app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server, cron, curl, etc.
    if (!origin) return callback(null, true);

    // Normalize origin by removing trailing slash for comparison
    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      // Return null, false instead of an Error to avoid crashing the middleware chain
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());


//routes
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/AI",AIRouter);
app.use("/api/user", userRouter);
app.use("/api/explore", exploreRouter);





export default app;