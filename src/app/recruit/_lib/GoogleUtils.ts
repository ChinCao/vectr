/* eslint-disable @typescript-eslint/no-explicit-any */
import { DepartmentsAbbreviation } from "../_constants/constants";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getDriveId } from "./utils";
import {
  InsertText,
  UpdateParagraphStyle,
  UpdateTextStyle,
} from "./_types/ParserTypes";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: atob(process.env.GOOGLE_SERVICE_ACOUNT_PRIVATE_KEY!),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive",
  ],
});

export const GetSheetData = async (department: string, sheet: "jd" | "qs") => {
  const sheets = google.sheets({
    version: "v4",
    auth: (await auth.getClient()) as any,
  });

  const range = `'${department}'!A:Z`;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId:
        sheet == "jd"
          ? process.env.GOOGLE_SHEET_ID_JD
          : process.env.GOOGLE_SHEET_ID_QS,
      range,
    });

    return response.data.values;
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const createDocumentInDrive = async (
  title: string,
  textRequest: InsertText[],
  styleRequest: (UpdateTextStyle | UpdateParagraphStyle)[],
  department: DepartmentsAbbreviation
) => {
  const docs = google.docs({
    version: "v1",
    auth: (await auth.getClient()) as any,
  });
  const drive = google.drive({
    version: "v3",
    auth: (await auth.getClient()) as any,
  });

  try {
    const docResponse = await docs.documents.create({
      requestBody: {
        title: title,
      },
    });

    const documentId = docResponse.data.documentId;

    if (!documentId) {
      console.log(documentId);
      throw new Error("Document ID is not available or is invalid.");
    }

    await docs.documents.batchUpdate({
      documentId: documentId,
      requestBody: {
        requests: textRequest,
      },
    });

    await docs.documents.batchUpdate({
      documentId: documentId,
      requestBody: {
        requests: styleRequest,
      },
    });
    await drive.files.update({
      fileId: documentId,
      addParents: getDriveId(department),
      fields: "id, parents",
    });

    return NextResponse.json({
      message: "Document created and moved to Drive",
      documentId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating document", error },
      { status: 500 }
    );
  }
};
