import { DepartmentsAbbreviation } from "../_constants/constants";
import {
  Departmentquestions,
  FormDataStructure,
  GeneralQuestions,
  PersonalInfo,
} from "../_types/RecruitTypes";
import {
  UpdateParagraphStyle,
  UpdateTextStyle,
  InsertText,
  GOOGLE_DOC_TITLE_FONT_SIZE,
  GOOGLE_DOC_TITLE_FONT_FAMILY,
  GOOGLE_DOC_TITLE_TYPE,
  GOOGLE_DOC_SUBTITLE_FONT_SIZE,
  GOOGLE_DOC_TITLE_TEXT_COLOR,
  GOOGLE_DOC_SUBTITLE_TYPE,
  GOOGLE_DOC_SUBTITLE_FONT_FAMILY,
  GOOGLE_DOC_SUBTITLE_TEXT_COLOR,
  GOOGLE_DOC_SUBTITLE_BOLD,
  GOOGLE_DOC_TITLE_BOLD,
  GOOGLE_DOC_LINK_COLOR,
  GOOGLE_DOC_TEXT_FONT_SIZE,
  NamedStyleType,
  TextAlignment,
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
          namedStyleType: GOOGLE_DOC_SUBTITLE_TYPE,
          alignment: TextAlignment.JUSTIFIED,
        },
        fields: "alignment,namedStyleType",
      },
    },
    {
      updateTextStyle: {
        range: {
          startIndex: startIndex,
          endIndex: endIndex,
        },
        textStyle: {
          bold: GOOGLE_DOC_SUBTITLE_BOLD,
          fontSize: {
            magnitude: GOOGLE_DOC_SUBTITLE_FONT_SIZE,
            unit: "PT",
          },
          weightedFontFamily: {
            fontFamily: GOOGLE_DOC_SUBTITLE_FONT_FAMILY,
          },
          foregroundColor: {
            color: {
              rgbColor: {
                red: GOOGLE_DOC_SUBTITLE_TEXT_COLOR.red / 255,
                green: GOOGLE_DOC_SUBTITLE_TEXT_COLOR.green / 255,
                blue: GOOGLE_DOC_SUBTITLE_TEXT_COLOR.blue / 255,
              },
            },
          },
        },
        fields: "bold,foregroundColor,fontSize,weightedFontFamily",
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
          namedStyleType: GOOGLE_DOC_TITLE_TYPE,
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
          bold: GOOGLE_DOC_TITLE_BOLD,
          fontSize: {
            magnitude: GOOGLE_DOC_TITLE_FONT_SIZE,
            unit: "PT",
          },
          weightedFontFamily: {
            fontFamily: GOOGLE_DOC_TITLE_FONT_FAMILY,
          },
          foregroundColor: {
            color: {
              rgbColor: {
                red: GOOGLE_DOC_TITLE_TEXT_COLOR.red / 255,
                green: GOOGLE_DOC_TITLE_TEXT_COLOR.green / 255,
                blue: GOOGLE_DOC_TITLE_TEXT_COLOR.blue / 255,
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
): [UpdateParagraphStyle, UpdateTextStyle] {
  const updateTextStyle: UpdateTextStyle = {
    updateTextStyle: {
      range: {
        startIndex: startIndex,
        endIndex: endIndex,
      },
      textStyle: {
        fontSize: {
          magnitude: GOOGLE_DOC_TEXT_FONT_SIZE,
          unit: "PT",
        },
        foregroundColor: {
          color: {
            rgbColor: {
              red: isLink ? GOOGLE_DOC_LINK_COLOR.red / 255 : 0,
              green: isLink ? GOOGLE_DOC_LINK_COLOR.green / 255 : 0,
              blue: isLink ? GOOGLE_DOC_LINK_COLOR.blue / 255 : 0,
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

  return [
    {
      updateParagraphStyle: {
        range: {
          startIndex: startIndex,
          endIndex: endIndex,
        },
        paragraphStyle: {
          namedStyleType: NamedStyleType.NORMAL_TEXT,
          alignment: TextAlignment.JUSTIFIED,
          indentFirstLine: {
            magnitude: 36,
            unit: "PT",
          },
        },
        fields: "alignment,indentFirstLine,namedStyleType",
      },
    },
    updateTextStyle,
  ];
}

function addText(
  text: string,
  textType: "title" | "answer" | "question"
): [InsertText, number] {
  const lineSeperator =
    textType == "title" ? "\n" : textType == "answer" ? "\n\n" : "\n";
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
  questions: Departmentquestions | GeneralQuestions | PersonalInfo,
  answers: GeneralQuestions | Departmentquestions | PersonalInfo
): number {
  const field_title = addText(title, "title");
  text_request.push(field_title[0]);
  style_request.push(
    ...formatTitle(indexTracker, indexTracker + field_title[1])
  );
  indexTracker = indexTracker + field_title[1];
  Object.entries(questions).forEach(([key, value], index) => {
    const question = addText(
      title == fieldsIndexTable["personal_info"]
        ? `${index + 1}. ` + value
        : `${index + 1}. ` + value["question"],
      "question"
    );
    text_request.push(question[0]);
    style_request.push(
      ...formatQuestion(indexTracker, indexTracker + question[1])
    );
    indexTracker = indexTracker + question[1];
    let answerText: string | undefined;
    if (title == fieldsIndexTable["personal_info"]) {
      const personalInfo = answers as PersonalInfo;
      answerText = personalInfo[key as keyof PersonalInfo];
    } else {
      const entry = (answers as Departmentquestions | GeneralQuestions)[
        key as keyof (Departmentquestions | GeneralQuestions)
      ];
      answerText = "answer" in entry ? entry["answer"] : undefined;
    }

    const answer = addText(answerText!, "answer");
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
  return indexTracker;
}

export const parseData = (
  data: FormDataStructure,
  department: DepartmentsAbbreviation
): [InsertText[], (UpdateTextStyle | UpdateParagraphStyle)[]] => {
  let indexTracker = 1;
  const text_request: InsertText[] = [];
  const style_request: (UpdateTextStyle | UpdateParagraphStyle)[] = [];
  indexTracker = GoogleDocParser(
    indexTracker,
    text_request,
    style_request,
    fieldsIndexTable["personal_info"],
    personalIndexTable,
    data["personal_info"]
  );

  indexTracker = GoogleDocParser(
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
  return [text_request, style_request];
};
