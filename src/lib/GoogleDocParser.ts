import {
  DepartmentQuestionsResponse,
  GeneralQuestionsResponse,
  PersonalInfo,
  Response,
} from "@/constants/constants";
import {
  UpdateParagraphStyle,
  UpdateTextStyle,
  NamedStyleType,
  InsertText,
} from "./_types/ParserTypes";

function formatQuestion(
  startIndex: number,
  endIndex: number
): [UpdateParagraphStyle, UpdateTextStyle] {
  return [
    {
      updateParagraphStyle: {
        range: {
          startIndex: startIndex,
          endIndex: endIndex,
        },
        paragraphStyle: {
          namedStyleType: NamedStyleType.HEADING_2,
        },
        fields: "namedStyleType",
      },
    },
    {
      updateTextStyle: {
        range: {
          startIndex: startIndex,
          endIndex: endIndex,
        },
        textStyle: {
          bold: true,
          fontSize: {
            magnitude: 13,
            unit: "PT",
          },
          foregroundColor: {
            color: {
              rgbColor: {
                red: 1,
                green: 0,
                blue: 0,
              },
            },
          },
        },
        fields: "bold,foregroundColor,fontSize",
      },
    },
  ];
}

function formatTitle(
  startIndex: number,
  endIndex: number
): [UpdateParagraphStyle, UpdateTextStyle] {
  return [
    {
      updateParagraphStyle: {
        range: {
          startIndex: startIndex,
          endIndex: endIndex,
        },
        paragraphStyle: {
          namedStyleType: NamedStyleType.HEADING_1,
        },
        fields: "namedStyleType",
      },
    },
    {
      updateTextStyle: {
        range: {
          startIndex: startIndex,
          endIndex: endIndex,
        },
        textStyle: {
          bold: true,
          fontSize: {
            magnitude: 25,
            unit: "PT",
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
  ];
}

function formatAnswer(
  startIndex: number,
  endIndex: number,
  isLink?: boolean,
  url?: string
): [UpdateTextStyle] {
  const updateTextStyle: UpdateTextStyle = {
    updateTextStyle: {
      range: {
        startIndex: startIndex,
        endIndex: endIndex,
      },
      textStyle: {
        fontSize: {
          magnitude: 13,
          unit: "PT",
        },
        foregroundColor: {
          color: {
            rgbColor: {
              red: isLink ? 17 / 255 : 0,
              green: isLink ? 85 / 255 : 0,
              blue: isLink ? 204 / 255 : 0,
            },
          },
        },
      },
      fields: "foregroundColor,fontSize" + (isLink ? ",link" : ""),
    },
  };

  if (isLink) {
    updateTextStyle.updateTextStyle.textStyle.link = { url: url };
  }

  return [updateTextStyle];
}

function addText(
  text: string | undefined,
  textType?: string
): [InsertText, number] {
  const lineSeperator =
    textType == "title" ? "\n" : textType == "answer" ? "\n\n" : ":";
  const additionalLength = lineSeperator.length;
  return [
    {
      insertText: {
        text: text + lineSeperator,
        endOfSegmentLocation: {},
      },
    },
    text!.length + additionalLength,
  ];
}

const personalIndexTable = {
  name: "Họ và tên",
  class: "Lớp",
  student_id: "Mã số HS",
  school_email: "Email trường",
  private_email: "Email riêng",
  facebook: "Link profile Facebook",
  instagram: "Link Instagram",
};

const fieldsIndexTable = {
  personal_info: "Thông tin cá nhân",
  general_questions: "Câu hỏi chung",
  department_questions: "Câu hỏi chuyên môn",
};

function GoogleDocParser(
  indexTracker: number,
  text_request: InsertText[],
  style_request: (UpdateTextStyle | UpdateParagraphStyle)[],
  title: string,
  questions:
    | DepartmentQuestionsResponse
    | GeneralQuestionsResponse
    | PersonalInfo,
  answers: DepartmentQuestionsResponse | GeneralQuestionsResponse | PersonalInfo
) {
  const field_title = addText(title, "title");
  text_request.push(field_title[0]);
  style_request.push(
    ...formatTitle(indexTracker, indexTracker + field_title[1])
  );
  indexTracker = indexTracker + field_title[1];
  Object.entries(questions).forEach(([key, value], index) => {
    const question = addText(
      title == "Thông tin cá nhân"
        ? `${index + 1}. ` + value
        : `${index + 1}. ` + value["question"]
    );
    text_request.push(question[0]);
    style_request.push(
      ...formatQuestion(indexTracker, indexTracker + question[1])
    );
    indexTracker = indexTracker + question[1];
    let answerText: string | undefined;
    if (title == "Thông tin cá nhân") {
      const personalInfo = answers as PersonalInfo;
      answerText = personalInfo[key as keyof PersonalInfo];
    } else {
      const entry = (
        answers as GeneralQuestionsResponse | DepartmentQuestionsResponse
      )[key];
      answerText = "answer" in entry ? entry["answer"] : undefined;
    }

    const answer = addText(answerText, "answer");
    text_request.push(answer[0]);
    const isLink: boolean =
      key == "facebook" || key == "instagram" ? true : false;
    style_request.push(
      ...formatAnswer(
        indexTracker,
        indexTracker + answer[1],
        isLink,
        answerText
      )
    );
    indexTracker = indexTracker + answer[1];
  });
}

export const parseData = (
  data: Response,
  department: string
): [InsertText[], (UpdateTextStyle | UpdateParagraphStyle)[]] => {
  let indexTracker = 1;
  const text_request: InsertText[] = [];
  const style_request: (UpdateTextStyle | UpdateParagraphStyle)[] = [];
  GoogleDocParser(
    indexTracker,
    text_request,
    style_request,
    fieldsIndexTable["personal_info"],
    personalIndexTable,
    data["personal_info"]
  );
  GoogleDocParser(
    indexTracker,
    text_request,
    style_request,
    fieldsIndexTable["general_questions"],
    data["general_questions"]["response"],
    data["general_questions"]["response"]
  );
  GoogleDocParser(
    indexTracker,
    text_request,
    style_request,
    fieldsIndexTable["department_questions"],
    data["department_questions"]["response"][department]["questions"],
    data["department_questions"]["response"][department]["questions"]
  );
  console.log(text_request, style_request);
  return [text_request, style_request];
};
