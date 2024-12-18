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
