import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: atob(process.env.GOOGLE_SERVICE_ACOUNT_PRIVATE_KEY),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const GetSheetData = async (department, sheet) => {
  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });

  const range = `'${department}'!A:Z`;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId:
        sheet == "jd"
          ? process.env.GOOGLE_SHEET_ID_JD
          : process.env.GOOGLE_SHEET_ID_QUESTION,
      range,
    });

    return response.data.values;
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
