import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./src/routes/games.js";

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(err);
  });

app.use(router);

app.use((req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App started on port ${process.env.PORT}`);
});
