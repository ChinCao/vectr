import { DepartmentsAbbreviation } from "@/app/recruit/_constants/constants";

const GOOGLE_DRIVE_IDS = {
  [DepartmentsAbbreviation.COMPUTER_SCIENCE]: process.env.GOOGLE_DRIVE_ID_CS,
  [DepartmentsAbbreviation.ROBOTICS]: process.env.GOOGLE_DRIVE_ID_ROBOTICS,
  [DepartmentsAbbreviation.HC]: process.env.GOOGLE_DRIVE_ID_HC,
  [DepartmentsAbbreviation.DESIGN]: process.env.GOOGLE_DRIVE_ID_DESGIN,
  [DepartmentsAbbreviation.PR_CW]: process.env.GOOGLE_DRIVE_ID_PR_CW,
  [DepartmentsAbbreviation.PR_EXTERNAL]: process.env.GOOGLE_DRIVE_ID_PR_EXT,
};

export function getDriveId(department: DepartmentsAbbreviation) {
  return GOOGLE_DRIVE_IDS[department];
}
