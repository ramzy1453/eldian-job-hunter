import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectDB, connectServer } from "./config";
import notFoundMiddleware from "./middlewares/notFound";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import authRouter from "./routes/auth";
import jobRouter from "./routes/job";
import authMiddleware from "./middlewares/authMiddleware";
import "express-async-errors";

// Server
const app = express();

// Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());

// Deployement
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Routes

app.use("/api/auth", authRouter);
app.use("/api/job", [authMiddleware], jobRouter);

app.use(notFoundMiddleware());
app.use(errorHandlerMiddleware());

// Connection
connectDB();
connectServer(app);
