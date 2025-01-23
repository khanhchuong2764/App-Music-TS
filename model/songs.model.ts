import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
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
    slug: {
      type: String,
      slug: "title",
      unique : true
    },
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