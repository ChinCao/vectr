import { DepartmentsAbbreviation } from "@/app/recruit/_constants/constants";
import { parseData } from "@/app/recruit/_lib/GoogleDocParser";
import { SaveToGoogleDoc } from "./SaveToGoogleDoc";
import { FormDataStructure } from "@/app/recruit/_types/RecruitTypes";

export async function SaveToDatabase(
  sanitized_data: FormDataStructure,
  submit: boolean,
  department: DepartmentsAbbreviation
) {
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
    await SaveToGoogleDoc(
      documentTitle,
      parsedData[0],
      parsedData[1],
      department
    );
  }
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "An error occurred");
  }
}
