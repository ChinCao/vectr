type FeedBack = {
  message: string;
  status: number;
};

interface SheetSuccessResponse extends FeedBack {
  data?: string[][];
}

export type GetSheetDataResponse = SheetSuccessResponse | FeedBack;

export type DocumentCreationFailure = FeedBack;
