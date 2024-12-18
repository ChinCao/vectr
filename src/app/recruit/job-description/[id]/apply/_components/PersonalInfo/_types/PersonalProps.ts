import { UseFormReturn } from "react-hook-form";

export interface PersonalInfoProps {
  studentID?: string;
  setStudentID?: React.Dispatch<React.SetStateAction<string>>;
  schoolEmail?: string;
  setSchoolEmail?: React.Dispatch<React.SetStateAction<string>>;
  manual?: boolean;
  setManual?: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  isFetching: boolean;
}
