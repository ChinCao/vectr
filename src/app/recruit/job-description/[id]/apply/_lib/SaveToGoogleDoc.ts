"use server";

import { DepartmentsAbbreviation } from "@/app/recruit/_constants/constants";
import {
  InsertText,
  UpdateTextStyle,
  UpdateParagraphStyle,
} from "@/app/recruit/_lib/_types/ParserTypes";
import { createDocumentInDrive } from "@/app/recruit/_lib/GoogleUtils";

export async function SaveToGoogleDoc(
  title: string,
  textRequest: InsertText[],
  styleRequest: (UpdateTextStyle | UpdateParagraphStyle)[],
  department: DepartmentsAbbreviation
) {
  await createDocumentInDrive(title, textRequest, styleRequest, department);
}
