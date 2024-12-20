import mongoose, {Schema} from "mongoose";
import {DepartmentQuestionEntry, DepartmentQuestionsResponse, FormDataStructure, GeneralQuestionsResponse} from "@/app/recruit/_types/RecruitTypes";
import {PersonalInfoType} from "../job-description/[id]/apply/_types/FormTypes";
import {DepartmentsAbbreviation} from "../_constants/constants";

const PersonalInfoSchema = new Schema<PersonalInfoType>({
  name: {type: String, required: false},
  class: {type: String, required: false},
  student_id: {type: String, required: false},
  facebook: {type: String, required: false},
  private_email: {type: String, required: false},
  school_email: {type: String, required: false},
  instagram: {type: String, required: false},
});

const GeneralQuestionSchema = new Schema<GeneralQuestionsResponse>({
  response: {
    type: Map, // Question ID
    of: {
      question: {type: String, required: false},
      answer: {type: String, required: false},
    },
  },
});

const DepartmentQuestionSchema = new Schema<DepartmentQuestionsResponse>({
  response: {
    type: Map,
    of: new Schema({
      questions: {
        type: Map,
        of: {
          question: {type: String, required: false},
          answer: {type: String, required: false},
        },
      },
      hasSubmitted: {type: Boolean, required: true},
    }),
  },
});

interface DepartmentQuestionDocument extends Document {
  response: Map<DepartmentsAbbreviation, {hasSubmitted: boolean; questions: Map<string, DepartmentQuestionEntry>}>;
}

DepartmentQuestionSchema.pre<DepartmentQuestionDocument>("save", function (next) {
  const departmentResponseMap = this.response || new Map();
  Object.values(DepartmentsAbbreviation).forEach((department) => {
    if (!departmentResponseMap.has(department)) {
      departmentResponseMap.set(department, {
        hasSubmitted: false,
        questions: new Map(),
      });
    }
  });

  this.response = departmentResponseMap;
  next();
});

const RecruitSchema = new Schema<FormDataStructure>({
  user_id: {type: String, required: true},
  personal_info: PersonalInfoSchema,
  department_questions: DepartmentQuestionSchema,
  general_questions: GeneralQuestionSchema,
});

const RecruitResponse = mongoose.models.Recruit || mongoose.model("Recruit", RecruitSchema);

export default RecruitResponse;
