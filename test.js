const department_questions = [
  "Tại sao bạn lại quyết định chọn vào ban Robotics của VECTR và điều gì đã khiến bạn yêu thích Robotics?",
  "Bạn đã có hiểu biết cơ bản về cách mạch điện hoạt động chưa và bạn hiểu như thế nào",
  "Bạn đã từng làm quen với lập trình, thiết kế cơ khí, hoặc điện tử chưa? Hãy mô tả một trải nghiệm cụ thể (nếu có).",
  "Bạn đã từng sử dụng những phần mềm mô phỏng liên quan đến Robotics chưa (ví dụ: Arduino IDE, TinkerCAD, SolidWorks,...)",
  "Bạn đã từng làm việc với các nền tảng, phần cứng hoặc thiết bị liên quan đến Robotics ví dụ như: Arduino, Raspberry Pi, hoặc LEGO Mindstorms,... chưa?",
  "Nếu có, bạn hãy đăng link drive về một dự án mà bạn đã sử dụng những phần mềm mô phỏng liên quan đến Robotics hay các nền tảng, phần cứng hoặc thiết bị liên quan đến Robotics.",
  "Theo bạn, chúng ta cần phẩm chất gì để có thể hoàn thành tốt một dự án về Robotics. Bạn nghĩ mình đã đạt được những phẩm chất nào?",
  "Giả sử VECTR đang phát triển một cánh tay robot nhằm hỗ trợ trẻ em bị dị tật bẩm sinh. Bạn hãy trình bày các thành phần chính của cánh tay robot này và mô tả cách mà các thành phần đó tương tác với nhau để điều khiển cánh tay theo ý muốn của người sử dụng. (Các sensors, logic và actuators)",
  "Bạn mong đợi gì về ban Robotics của câu lạc bộ VECTR?",
];

const modified_department_questions = [
  "Tại sao bạn lại quyết định chọn vào ban Robotics của VECTR và điều gì đã khiến bạn yêu thích Robotics?",
  "Bạn đã có hiểu biết cơ bản về cách mạch điện hoạt động chưa và bạn hiểu như thế nào",
  "Bạn đã từng làm quen với lập trình, thiết kế cơ khí, hoặc điện tử chưa? Hãy mô tả một trải nghiệm cụ thể (nếu có)",
  "Bạn đã từng sử dụng những phần mềm mô phỏng liên quan đến Robotics chưa (ví dụ: Arduino IDE, TinkerCAD, SolidWorks,)",
  "Bạn đã từng làm việc với các nền tảng, phần cứng hoặc thiết bị liên quan đến Robotics ví dụ như: Arduino, Raspberry Pi, hoặc LEGO Mindstorms, chưa?",
  "Nếu có, bạn hãy đăng link drive về một dự án mà bạn đã sử dụng những phần mềm mô phỏng liên quan đến Robotics hay các nền tảng, phần cứng hoặc thiết bị liên quan đến Robotics",
  "Theo bạn, chúng ta cần phẩm chất gì để có thể hoàn thành tốt một dự án về Robotics Bạn nghĩ mình đã đạt được những phẩm chất nào?",
  "Giả sử VECTR đang phát triển một cánh tay robot nhằm hỗ trợ trẻ em bị dị tật bẩm sinh Bạn hãy trình bày các thành phần chính của cánh tay robot này và mô tả cách mà các thành phần đó tương tác với nhau để điều khiển cánh tay theo ý muốn của người sử dụng (Các sensors, logic và actuators)",
  "Bạn mong đợi gì về ban Robotics của câu lạc bộ VECTR?",
];

const general_questions = [
  "Hãy nêu 3 điểm ưu điểm và 3 nhược điểm của bản thân và đề xuất giải pháp.",
  "Liệt kê các tổ chức và hoạt động xã hội đã từng tham gia (note rõ các hoạt động nào đã và đang tham gia)",
  "Bạn đã từng làm dự án nào về lĩnh vực STEM bao giờ chưa? Nếu có hãy miêu tả và ghi rõ về các dự án đó.",
  "Tại sao bạn muốn đăng ký vào câu lạc bộ VECTR - Vinschool Stem Club?",
  "Bạn có những mục tiêu gì hay dự án gì muốn triển khai trong tương lai? Việc tham gia vào VECTR sẽ giúp bạn đạt được mục tiêu đó như thế nào?",
  "Bạn có thể dành bao nhiêu thời gian cho VECTR? Liệu bạn có thể cân bằng thời gian học tập với tham gia các hoạt động?",
  "Hãy đánh giá mức độ sử dụng các công cụ văn phòng (Word, Excel, Powerpoint, v.v)",
];

const modified_general_questions = [
  "Hãy nêu 3 điểm ưu điểm và 3 nhược điểm của bản thân và đề xuất giải pháp",
  "Liệt kê các tổ chức và hoạt động xã hội đã từng tham gia (note rõ các hoạt động nào đã và đang tham gia)",
  "Bạn đã từng làm dự án nào về lĩnh vực STEM bao giờ chưa? Nếu có hãy miêu tả và ghi rõ về các dự án đó",
  "Tại sao bạn muốn đăng ký vào câu lạc bộ VECTR - Vinschool Stem Club?",
  "Bạn có những mục tiêu gì hay dự án gì muốn triển khai trong tương lai? Việc tham gia vào VECTR sẽ giúp bạn đạt được mục tiêu đó như thế nào?",
  "Bạn có thể dành bao nhiêu thời gian cho VECTR? Liệu bạn có thể cân bằng thời gian học tập với tham gia các hoạt động?",
  "Hãy đánh giá mức độ sử dụng các công cụ văn phòng (Word, Excel, Powerpoint, vv)",
];

const data = {
  user_id: "user_2qIH0ALLtxas9OSDdeHCbQfGYxq",
  personal_info: {
    name: "212121",
    school_email: "c054678@stu.vinschool.edu.vn",
    private_email: "chinhcaocu@gmail.com",
    student_id: "VS111111",
    class: "11b4",
    facebook: "2",
    instagram: "",
  },
  department_questions: {
    response: {
      robotics: {
        hasSubmitted: true,
        "Tại sao bạn lại quyết định chọn vào ban Robotics của VECTR và điều gì đã khiến bạn yêu thích Robotics?":
          "jaaaaaaaaaaaaaaa",
        "Bạn đã có hiểu biết cơ bản về cách mạch điện hoạt động chưa và bạn hiểu như thế nào":
          "jasssssssssssssssss",
        "Bạn đã từng làm quen với lập trình, thiết kế cơ khí, hoặc điện tử chưa? Hãy mô tả một trải nghiệm cụ thể (nếu có)":
          "jeeeeeeeeeeeeeeee",
        "Bạn đã từng sử dụng những phần mềm mô phỏng liên quan đến Robotics chưa (ví dụ: Arduino IDE, TinkerCAD, SolidWorks,)":
          "jrrrrrrrrrrrrrrr",
        "Bạn đã từng làm việc với các nền tảng, phần cứng hoặc thiết bị liên quan đến Robotics ví dụ như: Arduino, Raspberry Pi, hoặc LEGO Mindstorms, chưa?":
          "jhhhhhhhhhhhhh",
        "Nếu có, bạn hãy đăng link drive về một dự án mà bạn đã sử dụng những phần mềm mô phỏng liên quan đến Robotics hay các nền tảng, phần cứng hoặc thiết bị liên quan đến Robotics":
          "jwefqggwfwwfw",
        "Theo bạn, chúng ta cần phẩm chất gì để có thể hoàn thành tốt một dự án về Robotics Bạn nghĩ mình đã đạt được những phẩm chất nào?":
          "jgeeqgg  dqfq   fqfqf.QW?f/qf/",
        "Giả sử VECTR đang phát triển một cánh tay robot nhằm hỗ trợ trẻ em bị dị tật bẩm sinh Bạn hãy trình bày các thành phần chính của cánh tay robot này và mô tả cách mà các thành phần đó tương tác với nhau để điều khiển cánh tay theo ý muốn của người sử dụng (Các sensors, logic và actuators)":
          "j qf qfqf qe fq fqw ()",
        "Bạn mong đợi gì về ban Robotics của câu lạc bộ VECTR?":
          'jqfwqfq3r3fre2r32qrr ""',
      },
    },
  },
  general_questions: {
    response: {
      "Hãy nêu 3 điểm ưu điểm và 3 nhược điểm của bản thân và đề xuất giải pháp":
        "jwqwqwqqwwq",
      "Liệt kê các tổ chức và hoạt động xã hội đã từng tham gia (note rõ các hoạt động nào đã và đang tham gia)":
        "jwdveqf qe qfe qf q",
      "Bạn đã từng làm dự án nào về lĩnh vực STEM bao giờ chưa? Nếu có hãy miêu tả và ghi rõ về các dự án đó":
        "jfqfqd qeqf",
      "Tại sao bạn muốn đăng ký vào câu lạc bộ VECTR - Vinschool Stem Club?":
        "jwqfwqfq wg43",
      "Bạn có những mục tiêu gì hay dự án gì muốn triển khai trong tương lai? Việc tham gia vào VECTR sẽ giúp bạn đạt được mục tiêu đó như thế nào?":
        "qfqfqfqvda qwdq d",
      "Bạn có thể dành bao nhiêu thời gian cho VECTR? Liệu bạn có thể cân bằng thời gian học tập với tham gia các hoạt động?":
        "qwqfqj",
      "Hãy đánh giá mức độ sử dụng các công cụ văn phòng (Word, Excel, Powerpoint, vv)":
        "jwqd dqwfq21wq wf",
    },
  },
};

const final = ``;
