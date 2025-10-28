import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import auditRoutes from "./routes/router.js";

const app = express();
dotenv.config();

// Middleware
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", auditRoutes);

export { app };
