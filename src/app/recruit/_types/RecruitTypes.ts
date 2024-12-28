import {DepartmentsAbbreviation} from "../_constants/constants";
import {PersonalInfoType} from "../job-description/[id]/apply/_types/FormTypes";

export interface DepartmentQuestionEntry {
  question: string;
  answer: string | undefined;
  _id?: string;
}

export interface GeneralQuestionEntry {
  question: string;
  answer: string | undefined;
  _id?: string;
}

export interface PersonalInfo extends PersonalInfoType {
  _id?: string;
}

export type Departmentquestions = {
  [key in DepartmentsAbbreviation]: {
    hasSubmitted?: boolean;
    questions?: Record<string, DepartmentQuestionEntry>;
  };
};

export interface DepartmentQuestionsResponse {
  response: Departmentquestions;
}

export type GeneralQuestions = {[key: string]: GeneralQuestionEntry};

export interface GeneralQuestionsResponse {
  response: GeneralQuestions;
}

export interface FormDataStructure {
  user_id: string | undefined;
  personal_info: PersonalInfo;
  department_questions: DepartmentQuestionsResponse;
  general_questions: GeneralQuestionsResponse;
  _id?: string;
}

export interface Recruit {
  recruit: FormDataStructure;
}
