import express from "express";
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import router from "./src/routes/games.js";
import userRouter from "./src/routes/user.js";

// TODO: add real ui url

const app = express();
app.use(cors())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/games", router);
app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});
