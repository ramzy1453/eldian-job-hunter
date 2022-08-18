import mongoose from "mongoose";
import "dotenv/config";
const jobSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user ID"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
    },
    type: {
      type: String,
      required: [true, "Please provide type"],
      enum: ["full-time", "remote", "part-time", "internship"],
      default: "full-time",
    },
    status: {
      type: String,
      required: [true, "Please provide status"],
      enum: ["interview", "declined", "pending"],
      default: "interview",
    },
    jobLocation: {
      type: String,
      required: [true, "Please provide location"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
