import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      //can give tags to the video, so tht one can sort videos on the basis of tags.
      type: [String],
      default: [],
    },
    likes: {
      //add userIds to the array if any user is liked
      type: [String],
      default: [],
    },
    dislikes: {
      //pull away userIds from the array whoevr disliked
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
