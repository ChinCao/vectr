import {Tform} from "../../../../../_types/FormTypes";

export interface PersonalInfoProps {
  studentID?: string;
  setStudentID?: React.Dispatch<React.SetStateAction<string>>;
  schoolEmail?: string;
  setSchoolEmail?: React.Dispatch<React.SetStateAction<string>>;
  manual?: boolean;
  setManual?: React.Dispatch<React.SetStateAction<boolean>>;
  form: Tform;
  isFetching: boolean;
}
