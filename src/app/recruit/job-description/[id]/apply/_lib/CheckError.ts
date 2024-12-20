import { FormState } from "react-hook-form";
import { FormTabs, FormType } from "../_types/FormTypes";
import { PersonalInfoSchemaDefault } from "../_schema/PersonalInfoSchema";
import { Dispatch, SetStateAction } from "react";

export default function CheckError(
  formState: FormState<FormType>,
  department_questions: string[][],
  general_questions: string[][],
  setActiveTab: Dispatch<SetStateAction<FormTabs>>,
  activeTab: FormTabs
) {
  const hasPersonalInfoErrors = Object.keys(formState.errors).some((key) =>
    Object.keys(PersonalInfoSchemaDefault).includes(key)
  );
  const hasDepartmentErrors = Object.keys(formState.errors).some((key) =>
    department_questions[0].includes(key)
  );
  const hasGeneralErrors = Object.keys(formState.errors).some((key) =>
    general_questions[0].includes(key)
  );
  if (hasPersonalInfoErrors) {
    setActiveTab("personal-info");
  } else if (hasDepartmentErrors || hasGeneralErrors) {
    setActiveTab(activeTab);
  }
  const errorText = hasPersonalInfoErrors
    ? "thông tin cá nhân"
    : hasGeneralErrors
    ? "câu trả lời chung"
    : hasDepartmentErrors
    ? "câu trả lời chuyên môn"
    : null;
  if (hasDepartmentErrors || hasPersonalInfoErrors || hasGeneralErrors) {
    return errorText;
  }
  return false;
}
