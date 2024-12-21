import {DepartmentQuestionEntry, FormDataStructure} from "../_types/RecruitTypes";

export enum DepartmentsAbbreviation {
  COMPUTER_SCIENCE = "computer science",
  ROBOTICS = "robotics",
  HC = "hc",
  DESIGN = "design",
  PR_CW = "pr-cw",
  PR_EXTERNAL = "pr-ext",
}

export enum DepartmentsFull {
  COMPUTER_SCIENCE = "Ban Computer Science",
  ROBOTICS = "Ban Robotics",
  DESIGN = "Ban Design",
  HC = "Ban Hậu Cần",
  PR_CW = "Ban PR - Content Writer",
  PR_EXTERNAL = "Ban PR - External (Đối ngoại)",
}

export const COMPUTER_SCIENCE_NAME_FULL = DepartmentsFull.COMPUTER_SCIENCE;
export const ROBOTICS_NAME_FULL = DepartmentsFull.ROBOTICS;
export const DESIGN_NAME_FULL = DepartmentsFull.DESIGN;
export const HC_NAME_FULL = DepartmentsFull.HC;
export const PR_CW_NAME_FULL = DepartmentsFull.PR_CW;
export const PR_EXTERNAL_NAME_FULL = DepartmentsFull.PR_EXTERNAL;
export const COMPUTER_SCIENCE_NAME_ABBREV = DepartmentsAbbreviation.COMPUTER_SCIENCE;
export const ROBOTICS_NAME_ABBREV = DepartmentsAbbreviation.ROBOTICS;
export const HC_NAME_ABBREV = DepartmentsAbbreviation.HC;
export const DESIGN_NAME_ABBREV = DepartmentsAbbreviation.DESIGN;
export const PR_CW_NAME_ABBREV = DepartmentsAbbreviation.PR_CW;
export const PR_EXTERNAL_NAME_ABBREV = DepartmentsAbbreviation.PR_EXTERNAL;

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

type DepartmentImageKeys =
  | typeof COMPUTER_SCIENCE_NAME_ABBREV
  | typeof ROBOTICS_NAME_ABBREV
  | typeof DESIGN_NAME_ABBREV
  | typeof HC_NAME_ABBREV
  | typeof PR_CW_NAME_ABBREV
  | typeof PR_EXTERNAL_NAME_ABBREV;

export const CORE_IMAGE: Record<DepartmentImageKeys, string[]> = {
  [COMPUTER_SCIENCE_NAME_ABBREV]: ["/special-relativity-ZZpyj9.png", "/programming-python-dmduOj.png"],
  [ROBOTICS_NAME_ABBREV]: ["/electromagnetism-AzFMTl.png", "/quantum-computing-UHpCJ1.png"],
  [DESIGN_NAME_ABBREV]: ["/creative-coding-XgYZa1.png", "/calculus-nutshell-1DhUxj.png"],
  [HC_NAME_ABBREV]: ["/puzzle-science-Te3zoj.png", "/computer-science-algorithms-nwHk4m.png"],
  [PR_CW_NAME_ABBREV]: ["/Text_Analysis_in_Python-rcga5J.png", "/python-next-steps-E549hB.png"],
  [PR_EXTERNAL_NAME_ABBREV]: ["/how-computers-work-MYnrqg.png", "/how-llms-work-z7ovbF.png"],
};

export const JOB_DESCRIPTION_TITLES: Record<DepartmentsAbbreviation, string> = {
  [DepartmentsAbbreviation.COMPUTER_SCIENCE]:
    "Ban Khoa Học Máy Tính phát triển và thuyết trình các dự án coding như web, AI, ML, và game bằng JavaScript, Python, C#, C++. Chúng mình tổ chức sự kiện và tìm kiếm ý tưởng sáng tạo để nâng cao nhận thức về công nghệ.",
  [DepartmentsAbbreviation.DESIGN]:
    "Ban Thiết Kế tập trung vào việc tạo ý tưởng và thiết kế bài post cho mạng xã hội, cùng với standee, poster, và banner cho sự kiện. Chúng mình sử dụng thành thạo Photoshop, Canva, và Illustrator, đảm bảo tính đồng nhất và sáng tạo trong mọi sản phẩm.",
  [DepartmentsAbbreviation.ROBOTICS]:
    "Ban Robotics phát triển giải pháp công nghệ mới, tập trung vào thiết kế và chế tạo phần cứng. Chúng mình tổ chức sự kiện để khuyến khích sự sáng tạo và tìm kiếm ý tưởng cho các chủ đề hàng tuần về công nghệ robotics.",
  [DepartmentsAbbreviation.HC]:
    "Ban Hậu Cần lập kế hoạch và quản lý ngân sách cho sự kiện, chuẩn bị vật tư và thiết bị, cũng như thiết kế không gian hoạt động. Chúng mình hỗ trợ logistics cho các ban khác, đảm bảo mọi hoạt động diễn ra suôn sẻ.",
  [DepartmentsAbbreviation.PR_CW]:
    "Ban Content Writer phụ trách lên ý tưởng và viết bài cho các dự án quảng bá. Chúng mình sáng tạo, diễn đạt tốt, và có hiểu biết về toán học, vật lý, và coding, cùng kỹ năng viết lách cho văn bản hành chính.",
  [DepartmentsAbbreviation.PR_EXTERNAL]:
    "Ban Đối Ngoại phụ trách đàm phán và tổ chức sự kiện. Chúng mình là cầu nối giữa VECTR, học sinh, và nhà tài trợ, với khả năng giao tiếp và làm việc nhóm hiệu quả.",
};

interface DepartmentSchema {
  abbreviation: DepartmentsAbbreviation;
  full: DepartmentsFull;
  images: string[];
  url: string;
}

export const DEPARTMENT_INFO: DepartmentSchema[] = [
  {
    abbreviation: COMPUTER_SCIENCE_NAME_ABBREV,
    full: COMPUTER_SCIENCE_NAME_FULL,
    images: CORE_IMAGE[COMPUTER_SCIENCE_NAME_ABBREV],
    url: `/recruit/job-description/${COMPUTER_SCIENCE_NAME_ABBREV}`,
  },
  {
    abbreviation: ROBOTICS_NAME_ABBREV,
    full: ROBOTICS_NAME_FULL,
    images: CORE_IMAGE[ROBOTICS_NAME_ABBREV],
    url: `/recruit/job-description/${ROBOTICS_NAME_ABBREV}`,
  },
  {
    abbreviation: DESIGN_NAME_ABBREV,
    full: DESIGN_NAME_FULL,
    images: CORE_IMAGE[DESIGN_NAME_ABBREV],
    url: `/recruit/job-description/${DESIGN_NAME_ABBREV}`,
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

export const FULL_DEPARTMENT_TITLE = (id: DepartmentsAbbreviation) => {
  switch (id) {
    case COMPUTER_SCIENCE_NAME_ABBREV:
      return COMPUTER_SCIENCE_NAME_FULL;
    case ROBOTICS_NAME_ABBREV:
      return ROBOTICS_NAME_FULL;
    case DESIGN_NAME_ABBREV:
      return DESIGN_NAME_FULL;
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

export const RESPONSE_MAX_CHARACTER = 3000;
export const INFO_MAX_CHARACTER = 111;

export const BLANK_FORM_DATA: FormDataStructure = {
  user_id: undefined,
  personal_info: {
    name: "",
    school_email: "",
    student_id: "",
    facebook: "",
    private_email: "",
    class: "",
    instagram: "",
  },
  department_questions: {
    response: Object.fromEntries(
      Object.values(DepartmentsAbbreviation).map((department) => [
        department,
        {
          questions: {} as Record<string, DepartmentQuestionEntry>,
          hasSubmitted: false,
        },
      ])
    ) as {
      [key in DepartmentsAbbreviation]: {
        questions: Record<string, DepartmentQuestionEntry>;
        hasSubmitted: boolean;
      };
    },
  },
  general_questions: {response: {}},
};

export const FQA: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Tôi có thể apply nhiều ban khác nhau được không?",
    answer:
      "Có, bạn có thể apply được nhiều ban và tất cả câu trả lời của bạn sẽ được ghi nhận. Nhưng sau quá trình tuyển thành viên bạn chỉ có thể làm được 1 ban duy nhất mà chúng mình nghĩ là phù hợp với bạn nhất.",
  },
  {
    question: "Làm sao tôi có thể biết được trạng thái ứng tuyển của mình?",
    answer: "Mọi thông tin sẽ được cập nhật qua email riêng và email trường.",
  },
  {
    question: "Thông tin trên website có được bảo mật không?",
    answer: "Mọi thông tin trên website được bảo mật chặt chẽ và chỉ có thành viên CORE của VECTR mới có quyền truy cập.",
  },
  {
    question: "Những thông tin tôi điền trên form của website có được lưu không?",
    answer: "Có, mọi thông tin bạn ghi trên form sẽ được lưu tự động và bạn có thể quay trở lại để tiếp tục với câu trả lời của mình.",
  },
];

export const MISSION_SECTION_INFORMATION: {
  image_url: string;
  image_alt: string;
  title: string;
  content: string;
}[] = [
  {
    image_url: "/innovation.svg",
    image_alt: "innovation",
    title: "Khơi dậy và nuôi dưỡng niềm đam mê robotics và coding",
    content:
      "Khuyến khích niềm đam mê robotics (bất cứ dự án nào là sự giao thoa của cả 3 lĩnh vực coding-electronics-engineering) bên trong mỗi học sinh Vinschool. Và Tạo dựng một sân chơi - cộng đồng những người yêu thích robotics và coding để giao lưu và chia sẻ kiến thức.",
  },
  {
    image_url: "/grow.svg",
    image_alt: "grow",
    title: "Tạo ra những sản phẩm thiết thực để phục vụ cho cộng đồng",
    content:
      "Mang lại cơ hội giúp mọi người nhận ra giá trị của tri thức qua việc áp dụng vào thực tiễn, tạo ra nhiều phát minh và chia sẻ ý tưởng độc đáo. Khuyến khích thảo luận cởi mở để thỏa mãn đam mê và đóng góp cho cộng đồng.",
  },
  {
    image_url: "/thrive.png",
    image_alt: "thrive",
    title: "Kết nối những người đam mê chế tạo với giáo viên và các công cụ cần thiết",
    content:
      "Câu lạc bộ VECTR tại Vinschool Central Park sẽ cung cấp tài liệu học tập và các hoạt động bổ ích với sự hỗ trợ của nhà trường, bao gồm phần cứng và các tài liệu học tập. Sự kết hợp này sẽ giúp học sinh phát triển kỹ năng và kiến thức trong lĩnh vực robotics và computer science.",
  },
];

export const EMAIL_SUBJECT = "huhh";
