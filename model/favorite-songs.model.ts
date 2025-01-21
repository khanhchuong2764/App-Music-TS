import mongoose from "mongoose";
const FavoriteSongSchema = new mongoose.Schema(
  {
    user_id : String,
    songId : String
  },
  {
    timestamps:true
  }
);

const FavoriteSong = mongoose.model("FavoriteSong", FavoriteSongSchema, "favorite-songs");
export default FavoriteSong;   