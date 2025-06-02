import mongoose from "mongoose";

const videoGamesShema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imgURL: { type: String, required: true },
});

export default mongoose.model("VideoGame", videoGamesShema);
