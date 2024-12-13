import { PersonalInfoType } from "@/app/recruit/job-description/[id]/apply/_schema/PersonalInfoSchema";
import { z } from "zod";
export const CODING_NAME_FULL = "Ban Computer Science";
export const ROBOTICS_NAME_FULL = "Ban Robotics";
export const PH_DES_NAME_FULL = "Ban Design";
export const HC_NAME_FULL = "Ban Hậu Cần";
export const PR_CW_NAME_FULL = "Ban PR - Content Writer";
export const PR_EXTERNAL_NAME_FULL = "Ban PR - External (Đối ngoại)";
export const CODING_NAME_ABBREV = "computer science";
export const ROBOTICS_NAME_ABBREV = "robotics";
export const HC_NAME_ABBREV = "hc";
export const PH_DES_NAME_ABBREV = "design";
export const PR_CW_NAME_ABBREV = "pr-cw";
export const PR_EXTERNAL_NAME_ABBREV = "pr-ext";

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

type CoreImageKeys =
  | typeof CODING_NAME_ABBREV
  | typeof ROBOTICS_NAME_ABBREV
  | typeof PH_DES_NAME_ABBREV
  | typeof HC_NAME_ABBREV
  | typeof PR_CW_NAME_ABBREV
  | typeof PR_EXTERNAL_NAME_ABBREV;

export const CORE_IMAGE: Record<CoreImageKeys, string[]> = {
  [CODING_NAME_ABBREV]: [
    "/special-relativity-ZZpyj9.png",
    "/programming-python-dmduOj.png",
  ],
  [ROBOTICS_NAME_ABBREV]: [
    "/electromagnetism-AzFMTl.png",
    "/quantum-computing-UHpCJ1.png",
  ],
  [PH_DES_NAME_ABBREV]: [
    "/creative-coding-XgYZa1.png",
    "/calculus-nutshell-1DhUxj.png",
  ],
  [HC_NAME_ABBREV]: [
    "/puzzle-science-Te3zoj.png",
    "/computer-science-algorithms-nwHk4m.png",
  ],
  [PR_CW_NAME_ABBREV]: [
    "/Text_Analysis_in_Python-rcga5J.png",
    "/python-next-steps-E549hB.png",
  ],
  [PR_EXTERNAL_NAME_ABBREV]: [
    "/how-computers-work-MYnrqg.png",
    "/how-llms-work-z7ovbF.png",
  ],
};

const DepartmentSchema = z.object({
  abbreviation: z.string(),
  full: z.string(),
  images: z.array(z.string()),
  url: z.string().url(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DepartmentInfoSchema = z.array(DepartmentSchema);

export type DepartmentInfoType = z.infer<typeof DepartmentInfoSchema>;

export const DEPARTMENT_INFO: DepartmentInfoType = [
  {
    abbreviation: CODING_NAME_ABBREV,
    full: CODING_NAME_FULL,
    images: CORE_IMAGE[CODING_NAME_ABBREV],
    url: `/recruit/job-description/${CODING_NAME_ABBREV}`,
  },
  {
    abbreviation: ROBOTICS_NAME_ABBREV,
    full: ROBOTICS_NAME_FULL,
    images: CORE_IMAGE[ROBOTICS_NAME_ABBREV],
    url: `/recruit/job-description/${ROBOTICS_NAME_ABBREV}`,
  },
  {
    abbreviation: PH_DES_NAME_ABBREV,
    full: PH_DES_NAME_FULL,
    images: CORE_IMAGE[PH_DES_NAME_ABBREV],
    url: `/recruit/job-description/${PH_DES_NAME_ABBREV}`,
  },

  {
    abbreviation: PR_CW_NAME_ABBREV,
    full: PR_CW_NAME_FULL,
    images: CORE_IMAGE[PR_CW_NAME_ABBREV],
    url: `/recruit/job-description/${PR_CW_NAME_ABBREV}`,
  },
  {
    abbreviation: PR_EXTERNAL_NAME_ABBREV,
    full: PR_EXTERNAL_NAME_FULL,
    images: CORE_IMAGE[PR_EXTERNAL_NAME_ABBREV],
    url: `/recruit/job-description/${PR_EXTERNAL_NAME_ABBREV}`,
  },
  {
    abbreviation: HC_NAME_ABBREV,
    full: HC_NAME_FULL,
    images: CORE_IMAGE[HC_NAME_ABBREV],
    url: `/recruit/job-description/${HC_NAME_ABBREV}`,
  },
];

export const FULL_CORE_TITLE = (id: string) => {
  switch (id) {
    case CODING_NAME_ABBREV:
      return CODING_NAME_FULL;
    case ROBOTICS_NAME_ABBREV:
      return ROBOTICS_NAME_FULL;
    case PH_DES_NAME_ABBREV:
      return PH_DES_NAME_FULL;
    case PR_CW_NAME_ABBREV:
      return PR_CW_NAME_FULL;
    case HC_NAME_ABBREV:
      return HC_NAME_FULL;
    case PR_EXTERNAL_NAME_ABBREV:
      return PR_EXTERNAL_NAME_FULL;
  }
};

export const CLICK_SOUND_URL = "/sounds/click.mp3";
export const CLICK_SOUND_VOLUME = 0.05;

export const FAKE_DATA = {
  user_id: "user_001",
  personal_info: {
    name: "John Doe",
    class: "Senior",
    student_id: "S123456",
    facebook: "https://facebook.com/johndoe",
    private_email: "johndoe@example.com",
    school_email: "johndoe@school.edu",
  },
  department_questions: {
    reponse: {
      "computer science": {
        hasSubmitted: false,
        skibidi: "aaa",
      },
      "pr-cw": {
        hasSubmitted: false,
        nuhhh: "qijwqjwqjwqjwqwq",
      },
      MATH: {
        hasSubmitted: false,
      },
    },
  },
  general_questions: {
    reponse: {
      question1: "Answer to question 1",
      question2: "Answer to question 2",
    },
  },
};
