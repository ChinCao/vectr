"use server";

import {google} from "googleapis";
import {PersonalInfoSchema} from "../_schema/PersonalInfoSchema";
import {z} from "zod";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_WORKSHOP;
const RANGE = "Response!A:G";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: atob(process.env.GOOGLE_SERVICE_ACOUNT_PRIVATE_KEY!),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/documents", "https://www.googleapis.com/auth/drive"],
});

export async function submitForm(values: z.infer<typeof PersonalInfoSchema>) {
  try {
    const sheets = google.sheets({
      version: "v4",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      auth: (await auth.getClient()) as any,
    });

    const newRow = [
      values.name,
      values.student_id,
      values.class,
      values.school_email,
      values.private_email,
      values.phone,
      new Date().toLocaleString("vi-VN"),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [newRow],
      },
    });

    return {success: true};
  } catch (error) {
    console.error("Submission error:", error);
    return {success: false, error: "Failed to submit form"};
  }
}
