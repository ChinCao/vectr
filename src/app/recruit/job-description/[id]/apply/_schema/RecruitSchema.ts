import { DEPARTMENT_INFO } from "@/constants/constants";
import mongoose, { Schema } from "mongoose";

const PersonalInfoSchema = new Schema({
  full_name: { type: String, required: true },
  class: { type: String, required: true },
  student_id: { type: String, required: true },
  facebook_profile: { type: String, required: true },
  private_email: { type: String, required: true },
  school_email: { type: String, required: true },
});

const GeneralQuestionSchema = new Schema({
  reponse: {
    type: Map,
    of: String,
    default: {},
  },
});

const DepartmentQuestionSchema = new Schema({
  reponse: {
    type: Map,
    of: {
      type: Map,
      of: String,
      hasSubmitted: { type: Boolean, required: true },
    },
    default: () => {
      const map = new Map();
      DEPARTMENT_INFO.forEach((department) => {
        map.set(department.abbreviation, { hasSubmitted: false });
      });
      return map;
    },
  },
});

DepartmentQuestionSchema.pre("save", function (next) {
  const departmentResponseMap = this.reponse || new Map();

  DEPARTMENT_INFO.forEach((department) => {
    if (!departmentResponseMap.has(department.abbreviation)) {
      departmentResponseMap.set(department.abbreviation, {
        hasSubmitted: false,
      });
    }
  });

  this.reponse = departmentResponseMap;
  next();
});

const RecruitSchema = new Schema({
  user_id: { type: String, required: true },
  personal_info: PersonalInfoSchema,
  department_questions: DepartmentQuestionSchema,
  general_questions: GeneralQuestionSchema,
});

const RecruitResponse =
  mongoose.models.Recruit || mongoose.model("recruit", RecruitSchema);

export default RecruitResponse;
