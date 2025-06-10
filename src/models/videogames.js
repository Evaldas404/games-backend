import mongoose from "mongoose";

const videoGameSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  steamPrice: {type: Number, requierd: true},
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  playTimeHrs: { type: Number, required: true },
  platforms: { type: String, required: true },
  genres: { type: String, required: true },
  developer: { type: String, required: true },
  rating: { type: Number, required: true },
  ratingCount: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  deleted: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("VideoGame", videoGameSchema);
