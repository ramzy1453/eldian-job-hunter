import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import "dotenv/config";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Email don't match it's pattern",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8, "Your password mustn't be under 8 characters"],
    },
    location: {
      type: String,
      default: "Wano",
    },
    image: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    aboutme: {
      type: String,
      default: "Set a biography",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  this.location = (
    await (
      await fetch(
        `https://extreme-ip-lookup.com/json/?key=${process.env.country_key}`
      )
    ).json()
  ).country;
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userID: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
