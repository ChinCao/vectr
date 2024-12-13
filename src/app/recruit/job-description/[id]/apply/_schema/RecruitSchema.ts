import { DEPARTMENT_INFO } from "@/constants/constants";
import mongoose, { Schema } from "mongoose";
import { PersonalInfoType } from "./PersonalInfoSchema";

const PersonalInfoSchema = new Schema<PersonalInfoType>({
  name: { type: String, required: true },
  class: { type: String, required: true },
  student_id: { type: String, required: true },
  facebook: { type: String, required: true },
  private_email: { type: String, required: true },
  school_email: { type: String, required: true },
  instagram: { type: String, required: false },
});

const GeneralQuestionSchema = new Schema({
  response: {
    type: Map,
    of: String,
    default: {},
  },
});

const DepartmentQuestionSchema = new Schema({
  response: {
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
  const departmentResponseMap = this.response || new Map();

  DEPARTMENT_INFO.forEach((department) => {
    if (!departmentResponseMap.has(department.abbreviation)) {
      departmentResponseMap.set(department.abbreviation, {
        hasSubmitted: false,
      });
    }
  });

  this.response = departmentResponseMap;
  next();
});

const RecruitSchema = new Schema({
  user_id: { type: String, required: true },
  personal_info: PersonalInfoSchema,
  department_questions: DepartmentQuestionSchema,
  general_questions: GeneralQuestionSchema,
});

const RecruitResponse =
  mongoose.models.Recruit || mongoose.model("Recruit", RecruitSchema);

export default RecruitResponse;
