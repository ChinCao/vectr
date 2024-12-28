"use client";

import {DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";
import {FormDataStructure, DepartmentQuestionEntry, Recruit, DepartmentQuestionsResponse} from "@/app/recruit/_types/RecruitTypes";

export const saveToLocalStorage = (sanitized_data: FormDataStructure, initialData: Recruit, department: DepartmentsAbbreviation) => {
  if (typeof window !== "undefined") {
    const cacheDepartmentResponse: DepartmentQuestionsResponse = {
      response: Object.fromEntries(
        Object.values(DepartmentsAbbreviation).map((department) => [
          department,
          {
            questions: initialData?.recruit.department_questions.response[department].questions,
            hasSubmitted: initialData?.recruit.department_questions.response[department].hasSubmitted,
          },
        ])
      ) as {
        [key in DepartmentsAbbreviation]: {
          questions: Record<string, DepartmentQuestionEntry>;
          hasSubmitted: boolean;
        };
      },
    };

    cacheDepartmentResponse.response[department] = {
      questions: sanitized_data.department_questions.response[department].questions!,
    };

    const cacheData: Recruit = {
      recruit: {
        user_id: undefined,
        personal_info: sanitized_data.personal_info,
        general_questions: sanitized_data.general_questions,
        department_questions: cacheDepartmentResponse,
      },
    };
    localStorage.setItem("recruit-cache", JSON.stringify(cacheData));
  }
};
