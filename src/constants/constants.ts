const CODING_NAME_FULL = "Ban Coding";
const ROBOTICS_NAME_FULL = "Ban Robotics";
const PH_DES_NAME_FULL = "Ban PH (Design)";
const HC_NAME_FULL = "Ban Hậu Cần";
const PR_CW_NAME_FULL = "Ban PR - Content Writer";
const PR_EXTERNAL_NAME_FULL = "Ban PR - External (Đối ngoại)";

export const CORE_IMAGE = {
  coding: ["/special-relativity-ZZpyj9.png", "/programming-python-dmduOj.png"],
  robotics: ["/electromagnetism-AzFMTl.png", "/quantum-computing-UHpCJ1.png"],
  ph: ["/creative-coding-XgYZa1.png", "/calculus-nutshell-1DhUxj.png"],
  hc: ["/puzzle-science-Te3zoj.png", "/computer-science-algorithms-nwHk4m.png"],
  pr: ["/Text_Analysis_in_Python-rcga5J.png", "/python-next-steps-E549hB.png"],
};

export const DEPARTMENT_INFO = [
  {
    abbreviation: "coding",
    full: CODING_NAME_FULL,
    images: CORE_IMAGE["coding"],
  },
  {
    abbreviation: "robotics",
    full: ROBOTICS_NAME_FULL,
    images: CORE_IMAGE["robotics"],
  },
  { abbreviation: "ph", full: PH_DES_NAME_FULL, images: CORE_IMAGE["ph"] },

  {
    abbreviation: "pr-cw",
    full: PR_CW_NAME_FULL,
    images: CORE_IMAGE["pr"],
  },
  { abbreviation: "pr-external", full: PR_EXTERNAL_NAME_FULL },
  { abbreviation: "hc", full: HC_NAME_FULL, images: CORE_IMAGE["hc"] },
];

export const FULL_CORE_TITLE = (id: string) => {
  switch (id) {
    case "coding":
      return CODING_NAME_FULL;
    case "robotics":
      return ROBOTICS_NAME_FULL;
    case "ph":
      return PH_DES_NAME_FULL;
    case "pr":
      return "Ban PR";
    case "hc":
      return HC_NAME_FULL;
  }
};
