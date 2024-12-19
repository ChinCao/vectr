import { FormDataStructure } from "@/app/recruit/_types/RecruitTypes";
import {
  DynamicQuestionsType,
  FormType,
  PersonalInfoType,
} from "../_types/FormTypes";
import {
  BLANK_FORM_DATA,
  DepartmentsAbbreviation,
} from "@/app/recruit/_constants/constants";

export default function CreateFormatResponse(
  department_questions: string[][],
  general_questions: string[][],
  department: DepartmentsAbbreviation
) {
  return function (user_id: string, raw_data: FormType): FormDataStructure {
    const blank_form_data: FormDataStructure = BLANK_FORM_DATA;
    blank_form_data.user_id = user_id;

    Object.keys(raw_data).forEach((key) => {
      if (department_questions[0].includes(key)) {
        blank_form_data["department_questions"]["response"][department][
          "questions"
        ][key] = {
          question:
            department_questions[1][department_questions[0].indexOf(key)],
          answer: raw_data[key as keyof DynamicQuestionsType],
        };
      } else if (general_questions[0].includes(key)) {
        blank_form_data["general_questions"]["response"][
          key as keyof DynamicQuestionsType
        ] = {
          question: general_questions[1][general_questions[0].indexOf(key)],
          answer: raw_data[key as keyof DynamicQuestionsType],
        };
      } else {
        blank_form_data["personal_info"][key as keyof PersonalInfoType] =
          raw_data[key as keyof PersonalInfoType];
      }
    });

    return blank_form_data;
  };
}
