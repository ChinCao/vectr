export enum NamedStyleType {
  HEADING_1 = "HEADING_1",
  HEADING_2 = "HEADING_2",
  HEADING_3 = "HEADING_3",
  HEADING_4 = "HEADING_4",
  HEADING_5 = "HEADING_5",
  HEADING_6 = "HEADING_6",
  TITLE = "TITLE",
  SUBTITLE = "SUBTITLE",
  NORMAL_TEXT = "NORMAL_TEXT",
  NAMED_STYLE_TYPE_UNSPECIFIED = "NAMED_STYLE_TYPE_UNSPECIFIED",
}

export interface UpdateParagraphStyle {
  updateParagraphStyle: {
    range: {
      startIndex: number;
      endIndex: number;
    };
    paragraphStyle: {
      namedStyleType: NamedStyleType;
    };
    fields: "namedStyleType";
  };
}

export interface UpdateTextStyle {
  updateTextStyle: {
    range: {
      startIndex: number;
      endIndex: number;
    };
    textStyle: {
      bold?: boolean;
      fontSize?: {
        magnitude?: number;
        unit?: string;
      };
      weightedFontFamily?: {
        fontFamily?: string;
      };
      link?: {
        url?: string;
      };
      foregroundColor?: {
        color?: {
          rgbColor?: {
            red?: number;
            green?: number;
            blue?: number;
          };
        };
      };
    };
    fields: string;
  };
}

export interface InsertText {
  insertText: {
    text: string;
    endOfSegmentLocation: Record<string, unknown>;
  };
}

export const GOOGLE_DOC_TITLE_TYPE = NamedStyleType.HEADING_1;
export const GOOGLE_DOC_TITLE_FONT_SIZE = 25;
export const GOOGLE_DOC_TITLE_FONT_FAMILY = "Times New Roman";
export const GOOGLE_DOC_TITLE_TEXT_COLOR = { red: 231, green: 127, blue: 29 };
export const GOOGLE_DOC_TITLE_BOLD = true;

export const GOOGLE_DOC_SUBTITLE_TYPE = NamedStyleType.HEADING_2;
export const GOOGLE_DOC_SUBTITLE_FONT_SIZE = 13;
export const GOOGLE_DOC_SUBTITLE_BOLD = true;
export const GOOGLE_DOC_SUBTITLE_FONT_FAMILY = "Arial";
export const GOOGLE_DOC_SUBTITLE_TEXT_COLOR = { red: 255, green: 0, blue: 0 };

export const GOOGLE_DOC_TEXT_FONT_SIZE = 13;

export const GOOGLE_DOC_LINK_COLOR = { red: 17, green: 85, blue: 204 };
