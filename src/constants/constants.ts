export const FULL_CORE_TITLE = (id: string) => {
  switch (id) {
    case "coding":
      return "Ban Coding";
    case "robotics":
      return "Ban Robotics";
    case "ph":
      return "Ban PH (Des)";
    case "pr":
      return "Ban PR";
    case "hc":
      return "Ban Hậu Cần";
  }
};

export const CORE_IMAGE = {
  coding: ["/special-relativity-ZZpyj9.png", "/programming-python-dmduOj.png"],
  robotics: ["/electromagnetism-AzFMTl.png", "/quantum-computing-UHpCJ1.png"],
  ph: ["/creative-coding-XgYZa1.png", "/calculus-nutshell-1DhUxj.png"],
  hc: ["/puzzle-science-Te3zoj.png", "/computer-science-algorithms-nwHk4m.png"],
  pr: ["/Text_Analysis_in_Python-rcga5J.png", "/python-next-steps-E549hB.png"],
};
