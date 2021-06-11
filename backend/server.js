import express from 'express'
import dotenv from "dotenv";
import morgan from 'morgan'
import cors from "cors";

import {connectDb} from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { router as authRoutes } from "./route/authRoute.js";
import { router as userRoutes } from "./route/userRoute.js";

dotenv.config()

const app = express();

app.use(express.json());

app.use(cors());

connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("It's working.");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
