import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: atob(process.env.GOOGLE_SERVICE_ACOUNT_PRIVATE_KEY),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const GetSheetData = async () => {
  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
  const range = `'Robotics'!A:Z`;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_JD,
      range,
    });

    return response.data.values;
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
