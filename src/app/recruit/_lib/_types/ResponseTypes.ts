type SuccessResponse = {
  message: string;
  status: number;
  data?: string[][];
};

type ErrorResponse = {
  message: string;
  error: string;
  status: number;
};

export type GetSheetDataResponse = SuccessResponse | ErrorResponse;
