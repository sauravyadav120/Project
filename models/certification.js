import { Schema } from "mongoose";

export const certificationSchema = new Schema({
  certificateName: {
    type: String,
    required: [true, "Certification Name is missing"],
  },
  certificateCompanyName: {
    type: String,
    required: [true, "Company Name is required"],
  },
});
