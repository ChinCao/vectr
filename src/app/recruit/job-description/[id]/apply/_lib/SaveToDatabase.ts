import {DepartmentsAbbreviation, FORM_CLOSE_DAY} from "@/app/recruit/_constants/constants";
import {parseData} from "@/app/recruit/_lib/GoogleDocParser";
import {SaveToGoogleDoc} from "./SaveToGoogleDoc";
import {FormDataStructure} from "@/app/recruit/_types/RecruitTypes";
import {Dispatch, SetStateAction} from "react";
import {calculateTimeLeft} from "@/lib/utils";

export async function SaveToDatabase(
  sanitized_data: FormDataStructure,
  submit: boolean,
  department: DepartmentsAbbreviation,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  setIsSaving: Dispatch<SetStateAction<boolean>>,
  setisSubmitted: Dispatch<SetStateAction<boolean>>
) {
  if (submit) {
    setIsSubmitting(true);
  }

  if (!sanitized_data.user_id) {
    setIsSaving(false);

    return;
  }
  if (submit && calculateTimeLeft(FORM_CLOSE_DAY)) {
    const parsedData = parseData(sanitized_data, department);
    const documentTitle = `${sanitized_data["personal_info"]["name"]}_${sanitized_data["personal_info"]["class"]}_${sanitized_data["personal_info"]["student_id"]}`;
    await SaveToGoogleDoc(documentTitle, parsedData[0], parsedData[1], department);

    await fetch("/api/recruit/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: sanitized_data, department: department}),
    });

    setisSubmitted(true);
    setIsSubmitting(false);
  }
  const res = await fetch("/api/recruit/save", {
    method: "POST",
    body: JSON.stringify({data: sanitized_data, department: department}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  setIsSaving(false);

  if (!res.ok) {
    const errorData = await res.json();
    setIsSaving(false);
    setIsSubmitting(false);
    throw new Error(errorData.message || "An error occurred");
  }
}
