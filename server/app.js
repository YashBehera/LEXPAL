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
    origin: "http://localhost:3000",
    credentials: true
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