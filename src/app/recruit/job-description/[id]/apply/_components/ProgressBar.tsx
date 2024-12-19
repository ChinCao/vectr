import { Progress } from "@/components/ui/progress";

const ProgressBar = ({ activeTab }: { activeTab: string }) => {
  return (
    <Progress
      value={
        activeTab === "personal-info"
          ? (100 / 3) * 1
          : activeTab === "general-questions"
          ? (100 / 3) * 2
          : activeTab === "department-questions"
          ? (100 / 3) * 3
          : 0
      }
      className="w-full top-[0] z-[1000] h-[3px] fixed"
    />
  );
};

export default ProgressBar;
