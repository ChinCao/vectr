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

type DepartmentImageKeys =
  | typeof COMPUTER_SCIENCE_NAME_ABBREV
  | typeof ROBOTICS_NAME_ABBREV
  | typeof DESIGN_NAME_ABBREV
  | typeof HC_NAME_ABBREV
  | typeof PR_CW_NAME_ABBREV
  | typeof PR_EXTERNAL_NAME_ABBREV;

export const DEPARTMENT_ICON: Record<DepartmentImageKeys, string[]> = {
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

export interface DepartmentSchema {
  abbreviation: DepartmentsAbbreviation;
  full: DepartmentsFull;
  images: string[];
  url: string;
}

export const DEPARTMENT_INFO: DepartmentSchema[] = [
  {
    abbreviation: COMPUTER_SCIENCE_NAME_ABBREV,
    full: COMPUTER_SCIENCE_NAME_FULL,
    images: DEPARTMENT_ICON[COMPUTER_SCIENCE_NAME_ABBREV],
    url: `/recruit/job-description/${COMPUTER_SCIENCE_NAME_ABBREV}`,
  },
  {
    abbreviation: ROBOTICS_NAME_ABBREV,
    full: ROBOTICS_NAME_FULL,
    images: DEPARTMENT_ICON[ROBOTICS_NAME_ABBREV],
    url: `/recruit/job-description/${ROBOTICS_NAME_ABBREV}`,
  },
  {
    abbreviation: DESIGN_NAME_ABBREV,
    full: DESIGN_NAME_FULL,
    images: DEPARTMENT_ICON[DESIGN_NAME_ABBREV],
    url: `/recruit/job-description/${DESIGN_NAME_ABBREV}`,
  },

  {
    abbreviation: PR_CW_NAME_ABBREV,
    full: PR_CW_NAME_FULL,
    images: DEPARTMENT_ICON[PR_CW_NAME_ABBREV],
    url: `/recruit/job-description/${PR_CW_NAME_ABBREV}`,
  },
  {
    abbreviation: PR_EXTERNAL_NAME_ABBREV,
    full: PR_EXTERNAL_NAME_FULL,
    images: DEPARTMENT_ICON[PR_EXTERNAL_NAME_ABBREV],
    url: `/recruit/job-description/${PR_EXTERNAL_NAME_ABBREV}`,
  },
  {
    abbreviation: HC_NAME_ABBREV,
    full: HC_NAME_FULL,
    images: DEPARTMENT_ICON[HC_NAME_ABBREV],
    url: `/recruit/job-description/${HC_NAME_ABBREV}`,
  },
];

export const FULL_DEPARTMENT_TITLE = (id: DepartmentsAbbreviation | string) => {
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

export const RESPONSE_MAX_CHARACTER = 6942;
export const INFO_MAX_CHARACTER = 111;

export const BLANK_FORM_DATA: FormDataStructure = {
  user_id: undefined,
  personal_info: {
    name: "",
    school_email: "@stu.vinschool.edu.vn",
    student_id: "VS",
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
      "Khuyến khích đam mê robotics cho học sinh Vinschool qua dự án giao thoa coding, electronics, và engineering. Tạo cộng đồng cho những người yêu thích robotics và coding để giao lưu, chia sẻ kiến thức.",
  },
  {
    image_url: "/grow.svg",
    image_alt: "grow",
    title: "Tạo ra những sản phẩm thiết thực để phục vụ cho cộng đồng",
    content:
      "Mang lại cơ hội nhận ra giá trị tri thức qua việc áp dụng vào thực tiễn, tạo ra nhiều phát minh và chia sẻ ý tưởng độc đáo. Khuyến khích thảo luận cởi mở để thỏa mãn đam mê và đóng góp cho cộng đồng.",
  },
  {
    image_url: "/thrive.png",
    image_alt: "thrive",
    title: "Kết nối những người đam mê chế tạo với giáo viên và các công cụ cần thiết",
    content:
      "Câu lạc bộ VECTR tại Vinschool Central Park cung cấp tài liệu và hoạt động bổ ích, hỗ trợ học sinh phát triển kỹ năng trong robotics và computer science.",
  },
];

const PR_MAIL_CONTENT =
  "Toàn thể phi hành đoàn VECTR rất ghi nhận sự xung phong của bạn vào vị trí Nhà Giao Tiếp Vũ Trụ - ban PR. Có một chân lý không thể nào phủ nhận, một dự án thành công không chỉ đến từ chất lượng nội tại của nó, mà còn phụ thuộc (hầu hết trường hợp phần lớn) vào cách nó được quảng bá. Đó chính là cách chúng tôi ví von, rằng bạn - sẽ là người có khả năng quyết định số mệnh của không chỉ DECODE_01, mà cả một chuỗi những nhiệm vụ cao cả trong tương lai của tất cả chúng ta. Liệu bạn có đủ can đảm và sắc sảo để thuyết phục những nhà đầu tư - những người sẽ thắp lên niềm hy vọng về một dự án khả thi, hay không? VECTR rất mong muốn được chào mừng bạn gia nhập với chúng tôi, nhưng trước hết, hãy cho chúng tôi một ít thời gian để đưa ra lựa chọn sáng suốt và đúng đắn nhất! ";

export const CUSTOMIZED_DEPARTMENT_EMAIL: Record<DepartmentsAbbreviation, string> = {
  [DepartmentsAbbreviation.COMPUTER_SCIENCE]:
    "Toàn thể phi hành đoàn VECTR rất ghi nhận sự xung phong của bạn vào vị trí Điều Khiển Viên Buồng Lái - ban Computer Science. Sự đóng góp của bạn cho công cuộc thám hiểm DECODE_01 sẽ là rất đáng kể, vì dĩ nhiên, không chuyến tàu nào có thể diễn ra hoàn hảo nếu thiếu vắng bóng dáng của những chuyên viên điều khiển như bạn! VECTR rất mong muốn được chào mừng bạn gia nhập với chúng tôi, nhưng trước hết, hãy cho chúng tôi một ít thời gian để đưa ra lựa chọn sáng suốt và đúng đắn nhất!",
  [DepartmentsAbbreviation.ROBOTICS]:
    "Toàn thể phi hành đoàn VECTR rất ghi nhận sự xung phong của bạn vào vị trí Kỹ Thuật Viên - ban Robotics. Không thể phủ nhận tầm quan trọng của bất cứ vị trí nào, nhưng nói không ngoa, chúng ta còn chẳng thể nghĩ đến DECODE_01 nếu không có bạn - những Kỹ Thuật Viên xuất chúng nhất! Ai cũng có vô vàn ý tưởng và khát vọng, không đồng nghĩa với việc ai cũng có thể biến chúng thành hiện thực. Giờ thì bạn có thể cảm nhận được tầm quan trọng của bản thân rồi chứ..? VECTR rất mong muốn được chào mừng bạn gia nhập với chúng tôi, nhưng trước hết, hãy cho chúng tôi một ít thời gian để đưa ra lựa chọn sáng suốt và đúng đắn nhất!",
  [DepartmentsAbbreviation.PR_CW]: PR_MAIL_CONTENT,
  [DepartmentsAbbreviation.PR_EXTERNAL]: PR_MAIL_CONTENT,
  [DepartmentsAbbreviation.HC]:
    "Toàn thể phi hành đoàn VECTR rất ghi nhận sự xung phong của bạn vào vị trí của Đội Ngũ Tìm Kiếm Tài Nguyên - ban Logistics (Hậu cần). Không tổ chức và dự án nào có thể hoạt động trơn tru nếu thiếu đi những nỗ lực tuy nhỏ bé nhưng phi thường - đến từ những cá nhân tuyệt vời như chính bạn, và DECODE_01 cũng vậy. VECTR rất mong muốn được chào mừng bạn gia nhập với chúng tôi, nhưng trước hết, hãy cho chúng tôi một ít thời gian để đưa ra lựa chọn sáng suốt và đúng đắn nhất!",
  [DepartmentsAbbreviation.DESIGN]:
    "Toàn thể phi hành đoàn VECTR rất ghi nhận sự xung phong của bạn vào vị trí Nhà Thiết Kế - ban Design. Sự sáng tạo của bạn chính là động lực đưa những dự án tưởng chừng vĩ mô như DECODE_01 đến gần hơn với công chúng. VECTR rất mong muốn được chào mừng bạn gia nhập với chúng tôi, nhưng trước hết, hãy cho chúng tôi một ít thời gian để đưa ra lựa chọn sáng suốt và đúng đắn nhất! ",
};

export const BENEFITS_LOOKUP: {
  title: string;
  content: string;
  image_src: string;
}[] = [
  {
    title: "Giấy chứng nhận tham gia",
    content: "Nhận giấy chứng nhận chính thức, khẳng định sự tham gia và nỗ lực của bạn trong CLB.",
    image_src: "/explaining-variation-LbNO6h.png",
  },
  {
    title: "Tài liệu học tập phong phú",
    content: "Tiếp cận các tài liệu về STEM từ những nguồn cốt lõi, giúp nâng cao kiến thức chuyên môn.",
    image_src: "/VariablesCourseCard_960x960-75LzA9.png",
  },
  {
    title: "Quỹ tài trợ cho dự án cá nhân",
    content: "Được cấp kinh phí từ quỹ CLB để hiện thực hóa các dự án cá nhân và ý tưởng sáng tạo.",
    image_src: "/pre-algebra-OzcAr4.png",
  },
  {
    title: "Hỗ trợ từ các thành viên",
    content: "Nhận sự hỗ trợ nhiệt tình từ các thành viên khác trong việc triển khai các dự án cá nhân và cộng đồng.",
    image_src: "/knowledge-and-uncertainty-LErS9z.png",
  },
  {
    title: "Giá trị cho hồ sơ học bổng",
    content: "Tham gia CLB là một điểm cộng quý giá trong hồ sơ xin học bổng của bạn.",
    image_src: "/strategic-puzzles-long-set-0NgdQ0.png",
  },
  {
    title: "Cải thiện kiến thức và kỹ năng STEM",
    content: "Nâng cao kiến thức và kỹ năng trong các lĩnh vực STEM thông qua các hoạt động và dự án.",
    image_src: "/vectors-Grpuo7.png",
  },
  {
    title: "Phát triển kỹ năng mềm",
    content: "Cải thiện kỹ năng giao tiếp, làm việc nhóm và lãnh đạo thông qua các hoạt động nhóm.",
    image_src: "/logical-languages-gR02Vh.png",
  },
  {
    title: "Xây dựng mạng lưới quan hệ",
    content: "Kết nối với những người có cùng đam mê, mở rộng mạng lưới quan hệ cho tương lai.",
    image_src: "/cryptocurrency-ksKqSq.png",
  },
  {
    title: "Chia sẻ kiến thức qua workshops",
    content: "Cơ hội tổ chức và tham gia các buổi workshop, chia sẻ đam mê và kiến thức với cộng đồng.",
    image_src: "/geometry-fundamentals-R3GX1g.png",
  },
  {
    title: "Tham gia cuộc thi và sự kiện",
    content: "Cơ hội tham gia các cuộc thi STEM trong và ngoài nước, nâng cao kỹ năng và tạo dựng danh tiếng.",
    image_src: "/math-competition-fundamentals-RwT0fZ.png",
  },
  {
    title: "Đào tạo chuyên sâu",
    content: "Tham gia các khóa đào tạo và hội thảo chuyên sâu về các chủ đề mới nhất trong lĩnh vực STEM.",
    image_src: "/group-theory-FRXERp.png",
  },
  {
    title: "Khuyến khích sáng tạo",
    content: "Môi trường khuyến khích sự sáng tạo và đổi mới trong các dự án và ý tưởng của thành viên.",
    image_src: "/intro-neural-networks-MS8bJL.png",
  },
];

type ReplaceBanWithHead<T> = {
  [K in keyof T]: T[K] extends string ? (T[K] extends `Ban ${infer Rest}` ? `Head ${Rest}` : T[K]) : T[K];
};

type DepartmentsHead = ReplaceBanWithHead<typeof DepartmentsFull>;

interface CORE_SCHEMA {
  head_department: DepartmentsHead[keyof DepartmentsHead] | "Phó Chủ Tịch";
  department: DepartmentsAbbreviation | "Chọn ban";
  image_url: string;
  name: string;
  message: string;
  instagram: string;
  facebook: string;
}

export const CORE_IMAGES: CORE_SCHEMA[] = [
  {
    head_department: "Phó Chủ Tịch",
    department: "Chọn ban",
    name: "Cự Chính",
    image_url: "/chinh.jpg",
    message:
      "Tại VECTR, chúng mình suy nghĩ theo 1 cách khác biệt. Chúng mình nói được, phải làm được. VECTR sẽ là nơi ươm mầm cho các trí tưởng tượng điên rồ nhất của các bạn bay cao, và chúng ta sẽ cùng nhau thực hiện nó như là một gia đình. Khi đồng hành cùng chúng mình, hy vọng thanh xuân của các bạn được ví như một cuốn sách, và mỗi trang giấy sẽ ghi lại những kỷ niệm đẹp cùng với CLB VECTR.",
    instagram: "https://www.instagram.com/cao.cchinh/",
    facebook: "https://www.facebook.com/cao.cchinh",
  },
  {
    head_department: "Head Computer Science",
    department: DepartmentsAbbreviation.COMPUTER_SCIENCE,
    name: "Thế Phong",
    image_url: "/phong.jpg",
    message:
      "Hãy coi VECTR là một bài toán thú vị chuẩn bị được giải mã👩‍🔬🔦 Chúc các bạn có đủ tự tin, bình tĩnh và sự sáng tạo để chinh phục mọi thử thách phía trước nhé. Hẹn gặp các bạn trong team computer science của chúng mình nhé. 🧑‍💻✨",
    instagram: "https://www.instagram.com/deezforsure/",
    facebook: "https://www.facebook.com/phongunging",
  },
  {
    head_department: "Head Design",
    department: DepartmentsAbbreviation.DESIGN,
    name: "Gia Bảo",
    image_url: "/jabao.jpg",
    message:
      "Chào mọi người, mình là Gia Bảo. Đến với ban Design, mình tin rằng các bạn sẽ có được những cơ hội thể hiện và học hỏi từ các thành viên khác để phát triển kỹ năng sáng tạo của mình. Nếu bạn đam mê thiết kế và muốn thử thách bản thân, chúng ta hãy cùng nhau đưa những ý tưởng của chính mình thành hiện thực qua các bài thiết kế thật ấn tượng tại VECTR nhé!",
    instagram: "https://www.instagram.com/ihave_a_iife/",
    facebook: "https://www.facebook.com/giabao.huynhhoang.50",
  },
  {
    head_department: "Head PR - Content Writer",
    department: DepartmentsAbbreviation.PR_CW,
    name: "Bạch Dương",
    image_url: "/vicky.jpg",
    message:
      "Xin chào, mình là Bạch Dương, mọi người có thể gọi mình là Vic. Đến với ban PR, mình mong các bạn sẽ có thật nhiều trải nghiệm thú vị, không chỉ dừng lại ở việc lên ý tưởng và viết bài, bạn sẽ được tự mình khám phá ti tỉ những thứ khác nhau. Mình tin rằng mọi lĩnh vực đều có sự liên kết tương quan lẫn nhau (không chỉ nằm trong phạm trù của khoa học), vì thế các bạn sẽ được thoả sức thể hiện bản thân theo ý thích! Hãy chung vui cùng VECTR để trở thành 1 phần của những điều tuyệt vời tiếp theo nhé!",
    instagram: "https://www.instagram.com/iloveu_substitution/",
    facebook: "https://www.facebook.com/duong.ly.426010",
  },
  {
    head_department: "Head Hậu Cần",
    department: DepartmentsAbbreviation.HC,
    name: "Xuân Bách",
    image_url: "/sam.jpg",
    message:
      "Chào mọi người. mình là Xuân Bách mọi người có thể gọi mình là Sam.  Chúng mình là những người đứng sau hậu trường, đảm bảo mọi thứ từ khâu chuẩn bị, trang trí đến việc cung cấp vật dụng cần thiết đều được chuẩn bị chu đáo cho các buổi workshop hay booth tết fair sắp tới. Nhờ có ban hậu cần, các bạn thành viên nhóm mới có thể thoải mái tham gia các hoạt động mà không phải lo lắng về bất cứ điều gì. Vì thế chúng mình hãy cùng nhau trở thành một mảnh ghép quan trọng cho câu lạc VECTR và có thật nhiều trải nghiệm cùng nhau nhé!",
    facebook: "https://www.facebook.com/sam.hoang.393139",
    instagram: "https://www.instagram.com/samhoang682/",
  },
  {
    head_department: "Head PR - External (Đối ngoại)",
    department: DepartmentsAbbreviation.PR_EXTERNAL,
    name: "Khuê Anh",
    image_url: "/annie.jpg",
    message: `Tớ là Khuê Anh, hay còn được mọi người biết đến nhiều hơn với tên Annie. Đến với VECTR, các bạn sẽ có cơ hội làm việc cùng các thành viên siu đam mê stem như chúng tớ, đặc biệt là sẽ có cơ hội làm việc với 1 trưởng ban hết sức nhiệt tình, sẵn sàng giúp đỡ bạn 24/7!!  PR- External chúng mình sẽ đóng vai trò "cầu nối" giữa các cá nhân và các bên chúng mình hợp tác, vì vậy đừng ngại mà hãy cùng nhau xây dựng một môi trường làm việc thật thoải mái và tạo một sân chơi lành mạnh cho các bạn Vinser nhaa!`,
    instagram: "https://www.instagram.com/a.4nnie._/",
    facebook: "https://www.facebook.com/khnh.2102",
  },
  {
    head_department: "Head Robotics",
    department: DepartmentsAbbreviation.ROBOTICS,
    name: "Huy Hoàng",
    image_url: "/hoang.jpg",
    message:
      "Hi mọi người, mình là Huy Hoàng, mọi người có thể gọi mình là Peter. Ban Robotics là nơi mọi người sẽ có nhiều trải nghiệm thú vị không chỉ về lĩnh vực Robotics, mà còn về những lĩnh vực liên quan đến khoa học khác. Ban Robotics luôn ưu tiên sự thoải mái của mọi thành viên trong ban. Vì vậy, mọi người hãy luôn tự tin chia sẻ những ý tưởng mới về lĩnh vực Robotics và luôn chinh phục được những thử thách đang chờ bạn trong tương lai. Hãy cùng mình xây dựng một ban Robotics thật hoành tráng nhé.",
    facebook: "https://www.facebook.com/tony.phan.9022662",
    instagram: "https://www.instagram.com/peter_hades09/",
  },
];

export const EMAIL_SUBJECT = "01010100 01011001 00100001 - DECODE 01";

export const FORM_CLOSE_DAY = new Date(`2020-01-10T21:55:00+07:00`);

export const VECTR_FOUNDED_DAY = new Date(`2024-08-13T10:02:30+07:00`);
