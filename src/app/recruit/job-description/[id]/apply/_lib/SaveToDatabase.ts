import {DepartmentsAbbreviation} from "@/app/recruit/_constants/constants";
import {parseData} from "@/app/recruit/_lib/GoogleDocParser";
import {SaveToGoogleDoc} from "./SaveToGoogleDoc";
import {FormDataStructure} from "@/app/recruit/_types/RecruitTypes";
import {Dispatch, SetStateAction} from "react";

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
  const res = await fetch("/api/recruit/save", {
    method: "POST",
    body: JSON.stringify(sanitized_data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (submit) {
    const parsedData = parseData(sanitized_data, department);
    const documentTitle = `${sanitized_data["personal_info"]["name"]}_${sanitized_data["personal_info"]["class"]}_${sanitized_data["personal_info"]["student_id"]}`;
    try {
      await SaveToGoogleDoc(documentTitle, parsedData[0], parsedData[1], department);
      setisSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      setisSubmitted(true);
      setIsSubmitting(false);
      console.log(error);
      throw new Error("skibidi");
    }
  }
  setIsSaving(false);

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData.message);
    setIsSaving(false);
    setIsSubmitting(false);
    throw new Error(errorData.message || "An error occurred");
  }
}
