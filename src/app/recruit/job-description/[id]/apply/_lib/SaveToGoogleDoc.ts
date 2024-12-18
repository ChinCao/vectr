"use server";

import { DepartmentsAbbreviation } from "@/constants/constants";
import {
  InsertText,
  UpdateTextStyle,
  UpdateParagraphStyle,
} from "@/lib/_types/ParserTypes";
import { createDocumentInDrive } from "@/lib/GoogleSpreadsheet";

export async function SaveToGoogleDoc(
  title: string,
  textRequest: InsertText[],
  styleRequest: (UpdateTextStyle | UpdateParagraphStyle)[],
  department: DepartmentsAbbreviation
) {
  await createDocumentInDrive(title, textRequest, styleRequest, department);
}
