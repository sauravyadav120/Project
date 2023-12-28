import { Schema } from "mongoose";

export const skillsSchema = new Schema({
  skillName: {
    type: String,
    required: [true, "Skill name is mandatory"],
  },
});
