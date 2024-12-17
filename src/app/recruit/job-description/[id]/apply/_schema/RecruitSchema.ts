import { DEPARTMENT_INFO } from "@/constants/constants";
import mongoose, { Schema } from "mongoose";
import { PersonalInfoType } from "./PersonalInfoSchema";

const PersonalInfoSchema = new Schema<PersonalInfoType>({
  name: { type: String, required: false },
  class: { type: String, required: false },
  student_id: { type: String, required: false },
  facebook: { type: String, required: false },
  private_email: { type: String, required: false },
  school_email: { type: String, required: false },
  instagram: { type: String, required: false },
});

const GeneralQuestionSchema = new Schema({
  response: {
    type: Map, // Question ID
    of: {
      question: { type: String, required: false },
      answer: { type: String, required: false },
    },
  },
});

const DepartmentQuestionSchema = new Schema({
  response: {
    type: Map, // Department
    of: {
      questions: {
        type: Map, // Question ID
        of: {
          question: { type: String, required: false },
          answer: { type: String, required: false },
        },
      },
      hasSubmitted: { type: Boolean, required: true },
    },
    default: () => {
      const map = new Map();
      DEPARTMENT_INFO.forEach((department) => {
        map.set(department.abbreviation, {
          questions: null,
          hasSubmitted: false,
        });
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
        questions: null,
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
