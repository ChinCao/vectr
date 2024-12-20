import {FormDataStructure, PersonalInfo} from "@/app/recruit/_types/RecruitTypes";
import {DynamicQuestionsType, FormType} from "../_types/FormTypes";
import {BLANK_FORM_DATA, DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";

export default function CreateFormatResponse(
  user_id: string | undefined,
  department_questions: string[][],
  general_questions: string[][],
  department: DepartmentsAbbreviation
) {
  return function (raw_data: FormType, submit: boolean): FormDataStructure {
    const blank_form_data: FormDataStructure = BLANK_FORM_DATA;
    blank_form_data.user_id = user_id;

    blank_form_data.department_questions.response[department].hasSubmitted = submit;
    Object.keys(raw_data).forEach((key) => {
      if (department_questions[0].includes(key)) {
        blank_form_data.department_questions.response[department].questions[key] = {
          question: department_questions[1][department_questions[0].indexOf(key)],
          answer: raw_data[key as keyof DynamicQuestionsType],
        };
      } else if (general_questions[0].includes(key)) {
        blank_form_data.general_questions.response[key as keyof DynamicQuestionsType] = {
          question: general_questions[1][general_questions[0].indexOf(key)],
          answer: raw_data[key as keyof DynamicQuestionsType],
        };
      } else {
        if (raw_data[key as keyof PersonalInfo] !== undefined) {
          blank_form_data.personal_info[key as keyof PersonalInfo] = raw_data[key as keyof PersonalInfo] as string;
        }
      }
    });

    return blank_form_data;
  };
}
