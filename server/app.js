import express from "express";
import cookieParser from "cookie-parser"

import cors from "cors";

import authRouter from "./src/routes/auth.route.js";
import uploadRouter from "./src/routes/upload.route.js";
import AIRouter from "./src/routes/AI.route.js";
import userRouter from "./src/routes/user.route.js";
import exploreRouter from "./src/routes/explore.route.js";


const app = express();



const allowedOrigins = [
  "https://lexpal.in",
  "https://www.lexpal.in"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server, cron, curl, etc.
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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