import { Schema } from "mongoose";

export const experienceSchema = new Schema({
  jobType: {
    type: String,
    required: [true, "Job Type is required"],
  },
  company: {
    type: String,
    required: [true, "Company Name is required"],
  },
  startDate: {
    type: String,
    required: [true, "Start Date is required"],
  },
  endDate: {
    type: String,
    default: null,
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
  },
});
