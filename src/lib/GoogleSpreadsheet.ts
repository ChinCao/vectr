/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from "googleapis";
import { NextResponse } from "next/server";

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

export const createDocumentInDrive = async (title: string) => {
  const docs = google.docs({
    version: "v1",
    auth: await auth.getClient(),
  });
  const drive = google.drive({
    version: "v3",
    auth: await auth.getClient(),
  });

  try {
    // Create the document
    const docResponse = await docs.documents.create({
      requestBody: {
        title: title,
      },
    });

    const documentId = docResponse.data.documentId;
    const text1 = "Thisissome text:";
    const text2 = " here is the actual data\n\n";
    const text3 = " Skiid text:";
    const text4 = " here is the fake data\n";
    const requests = [
      {
        insertText: {
          text: text1,
          endOfSegmentLocation: {},
        },
      },
      {
        insertText: {
          text: text2,
          endOfSegmentLocation: {},
        },
      },

      {
        insertText: {
          text: text3,
          endOfSegmentLocation: {},
        },
      },
      {
        insertText: {
          text: text4,
          endOfSegmentLocation: {},
        },
      },
    ];
    await docs.documents.batchUpdate({
      documentId: documentId,
      requestBody: {
        requests: requests,
      },
    });

    const bold_requests = [
      {
        updateTextStyle: {
          range: {
            startIndex: 1,
            endIndex: 17,
          },
          textStyle: {
            bold: true,
            fontSize: {
              magnitude: 25, // Set your desired font size here
              unit: "PT", // PT for points
            },
            weightedFontFamily: {
              fontFamily: "Times New Roman",
            },
            foregroundColor: {
              color: {
                rgbColor: {
                  red: 231 / 255,
                  green: 127 / 255,
                  blue: 29 / 255,
                },
              },
            },
          },
          fields: "bold,fontSize,foregroundColor,weightedFontFamily",
        },
      },
      {
        updateTextStyle: {
          range: {
            startIndex: 43,
            endIndex: 55,
          },
          textStyle: {
            bold: true,
          },
          fields: "bold",
        },
      },
    ];
    await docs.documents.batchUpdate({
      documentId: documentId,
      requestBody: {
        requests: bold_requests,
      },
    });

    await drive.files.update({
      fileId: documentId,
      addParents: process.env.GOOGLE_DRIVE_ID_CS, // Use addParents to specify the folder
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
