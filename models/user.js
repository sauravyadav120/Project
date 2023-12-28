import { Schema, model, models } from "mongoose";
import {
  certificationSchema,
  educationSchema,
  experienceSchema,
  skillsSchema,
} from "./index";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is missing"],
  },
  password: {
    type: String,
    required: [true, "Password is missing"],
  },
  image: {
    type: String,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is missing"],
  },
  bio:{
    type:String,
  },
  professionalDetails: {
    skills: [skillsSchema],
    experiences: [experienceSchema],
    education: [educationSchema],
    certification: [certificationSchema],
  },
  connections: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = models.User || model("User", userSchema);
export default User;
