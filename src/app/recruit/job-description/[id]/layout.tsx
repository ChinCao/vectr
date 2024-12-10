import { ReactNode } from "react";
import NavigationButton from "../../_components/NavigationButton";

const JobLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-24 container">
      <NavigationButton
        href="/recruit/job-description"
        text="Trở lại trang trước"
        direction="left"
      />
      {children}
    </div>
  );
};

export default JobLayout;
