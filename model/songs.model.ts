import mongoose from "mongoose";
const SongSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    topicId : String,
    singerId : String,
    description : String,
    lyrics : String,
    audio : String,
    like: {
      type:Number,
      default: 0
    }, // lưu Id người like []
    listen: {
      type:Number,
      default: 0
    },
    slug: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", SongSchema, "songs");
export default Song;   