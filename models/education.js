import { Schema } from "mongoose";

export const educationSchema = new Schema({
  collegeName: {
    type: String,
    required: [true, "College Name is missing"],
  },
  degree: {
    type: String,
    required: [true, "Degree is required"],
  },
  startDate: {
    type: String,
    required: [true, "Start Date is required"],
  },
  endDate: {
    type: String,
  },
  about: {
    type: String,
  },
});
