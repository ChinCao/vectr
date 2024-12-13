import { Department, DEPARTMENT_INFO } from "@/constants/constants";
import mongoose, { Schema } from "mongoose";

const PersonalInfoSchema = new Schema({
  full_name: { type: String, required: true },
  class: { type: String, required: true },
  student_id: { type: String, required: true },
  facebook_profile: { type: String, required: true },
  private_email: { type: String, required: true },
  school_email: { type: String, required: true },
});

const QuestionsSchema = new Schema({
  general_questions: {
    type: Map,
    of: String,
    default: {},
  },
  department_questions: {
    type: Map,
    of: {
      type: Map,
      of: String,
      default: {},
    },
    default: () => {
      const map = new Map();
      DEPARTMENT_INFO.forEach((department: Department) => {
        map.set(department.abbreviation, {});
      });
      return map;
    },
  },
});

const RecruitSchema = new Schema({
  user_id: { type: String, required: true },
  recruits: {
    type: Map,
    of: new Schema({
      personal_info: PersonalInfoSchema,
      questions: QuestionsSchema,
    }),
    default: {},
  },
});

const RecruitResponse =
  mongoose.models.Recruit || mongoose.model("Recruit", RecruitSchema);

export default RecruitResponse;
